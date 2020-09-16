import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Data} from '../../../../models/Data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CronJob} from 'cron';
import {DataJSON} from '../../../../json/DataJSON';
import * as CryptoJS from 'crypto-js';
import {EncryptionService} from '../../../../services/encryption.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit{

  dailyHeaders = ['User'
    , 'Device', 'Date'];
  dailyContainer: MatTableDataSource<Data>;
  dailyUrl = 'http://localhost:8081/daily-data';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  @Input() dailyData: Data;
  @Output() dailyDataEmitter: EventEmitter<Data[]> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dailyContainer.filter = filterValue;
  }

  constructor(private http: HttpClient, private cryptingService: EncryptionService) {
  }

  ngOnInit(): void {
    this.getDailyData();
    const job = new CronJob('0/15 * * * * *', () => {
      this.getDailyData();
    }, null, true, 'Europe/Warsaw');
    job.start();
  }

  getDailyData() {
    this.http.get<DataJSON[]>(`${this.dailyUrl}?token=${sessionStorage.getItem('token')}`, this.httpOptions)
      .subscribe(dataJsonArray => {
        this.dailyContainer = new MatTableDataSource(dataJsonArray.map(dataJson => {
          const key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
          const iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
          const data = this.cryptingService.hex2a(CryptoJS.AES.decrypt(dataJson.phoneNumber, key, {iv: iv}).toString());
          return {
            User: data,
            Device: dataJson.location,
            Date: new Date(dataJson.date * 1000)
          };
        }));
        this.dailyContainer.paginator = this.paginator;
        this.dailyContainer.sort = this.sort;
        }
      );
  }
}
