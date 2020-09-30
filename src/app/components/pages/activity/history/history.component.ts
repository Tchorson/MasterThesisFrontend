import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Data} from '../../../../models/Data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {EncryptionService} from '../../../../services/encryption.service';
import {DataJSON} from '../../../../json/DataJSON';
import {MatTableDataSource} from '@angular/material/table';
import * as CryptoJS from 'crypto-js';
import {CronJob} from 'cron';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyHeaders = ['User', 'Device', 'Date'];
  historyContainer: MatTableDataSource<Data>;
  historyUrl = 'http://localhost:8081/history-data';
  findUsersUrl = 'http://localhost:8081/find-users';
  placeAndTimeUrl = 'http://localhost:8081/users-data';
  componentMode = 'History';
  targetUser = '';
  usersHeader = ['User'];

  startDateFormat = null;
  stopDateFormat = null;
  phoneUsersContainer: string[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  @Input() historyData: Data;
  @Output() historyDataEmitter: EventEmitter<Data[]> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private cryptingService: EncryptionService) {
  }

  ngOnInit(): void {
    this.getHistoryData();
    const job = new CronJob('0/15 * * * * *', () => {
      if (this.componentMode === 'History') {
        this.getHistoryData();
      }
      if (this.componentMode === 'UsersWhoMetUserRecently') {
        if (this.startDateFormat !== null) {
          this.startDateFormat.setUTCHours(0, 0, 0);
        }
        if (this.stopDateFormat !== null) {
          this.stopDateFormat.setUTCHours(23, 59, 59);
        }
      }
      if (this.componentMode === 'UsersFromParticularPlaceAndTime'){
        if (this.startDateFormat !== null) {
          this.startDateFormat.setUTCHours(0, 0, 0);
        }
        if (this.stopDateFormat !== null) {
          this.stopDateFormat.setUTCHours(23, 59, 59);
        }
      }
    }, null, true, 'Europe/Warsaw');
    job.start();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.historyContainer.filter = filterValue;
  }

  getHistoryData() {
    this.http.get<DataJSON[]>(`${this.historyUrl}?token=${sessionStorage.getItem('token')}`, this.httpOptions)
      .subscribe(dataJsonArray => {
          this.historyContainer = new MatTableDataSource(dataJsonArray.map(dataJson => {
            const key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
            const iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
            const data = this.cryptingService.hex2a(CryptoJS.AES.decrypt(dataJson.phoneNumber, key, {iv}).toString());
            return {
              User: data,
              Device: dataJson.location,
              Date: new Date(dataJson.date * 1000)
            };
          }));
          this.historyContainer.paginator = this.paginator;
          this.historyContainer.sort = this.sort;
        }
      );
  }

  findUsers() {
    if (this.targetUser === undefined || this.targetUser === null || this.targetUser.trim() === '' || this.startDateFormat === null || this.stopDateFormat === null) {
      alert('DATA OR USER NOT DECLARED');
    }
    else {
      if (this.componentMode === 'UsersWhoMetUserRecently'){
        this.http.post<string[]>(`${this.findUsersUrl}?token=${sessionStorage.getItem('token')}`,
          {
            userData: this.cryptingService.encrypt(this.targetUser),
            startDate: (this.startDateFormat.getTime() / 1000),
            stopDate: (this.stopDateFormat.getTime() / 1000)
          }, this.httpOptions)
          .subscribe(phoneUsersArray => {
            this.phoneUsersContainer = phoneUsersArray.map(phone => {
              const key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
              const iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
              return this.cryptingService.hex2a(CryptoJS.AES.decrypt(phone, key, {iv}).toString());
            });
          });
      }
      else{
        this.http.post<string[]>(`${this.placeAndTimeUrl}?token=${sessionStorage.getItem('token')}`,
          {
            userData: this.cryptingService.encrypt(this.targetUser),
            startDate: (this.startDateFormat.getTime() / 1000),
            stopDate: (this.stopDateFormat.getTime() / 1000)
          }, this.httpOptions)
          .subscribe(phoneUsersArray => {
            this.phoneUsersContainer = phoneUsersArray.map(phone => {
              const key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
              const iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
              return this.cryptingService.hex2a(CryptoJS.AES.decrypt(phone, key, {iv}).toString());
            });
          });
      }
    }
  }

  refreshData(){
    this.phoneUsersContainer = [];
    this.targetUser = '';
    this.startDateFormat = '';
    this.stopDateFormat = '';
  }
}
