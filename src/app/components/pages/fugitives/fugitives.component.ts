import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CronJob} from 'cron';
import {Fugitive} from '../../../models/Fugitive';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EncryptionService} from '../../../services/encryption.service';
import {FugitiveJSON} from '../../../json/FugitiveJSON';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-fugitives',
  templateUrl: './fugitives.component.html',
  styleUrls: ['./fugitives.component.css']
})
export class FugitivesComponent implements OnInit {

  fugitiveHeaders = ['User', 'Missing_Date'];
  fugitivesContainer: Fugitive[];
  fugitiveJSONArrayCache: FugitiveJSON[];

  fugitivesUrl = 'http://localhost:8081/get-all-fugitives';
  alertUrl = 'http://localhost:8081/alert';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  @Input() fugitive: Fugitive;
  @Output() unknownUserEmitter: EventEmitter<Fugitive[]> = new EventEmitter();

  constructor(private http: HttpClient, private cryptingService: EncryptionService) {
  }

  ngOnInit(): void {
    this.getFugitives();
    const job = new CronJob('0/15 * * * * *', () => {
      this.getFugitives();
    }, null, true, 'Europe/Warsaw');
    job.start();
  }

  getFugitives(): void {
    this.http.get<FugitiveJSON[]>(`${this.fugitivesUrl}?token=${sessionStorage.getItem('token')}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(fugitiveJSONArray => {
      this.fugitiveJSONArrayCache = fugitiveJSONArray;
      this.fugitivesContainer = fugitiveJSONArray.map(fugitiveJSON => {
        let key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
        let iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
        let data = this.cryptingService.hex2a(CryptoJS.AES.decrypt(fugitiveJSON.phoneNumber, key, {iv: iv}).toString());
        return {
          User: data,
          Missing_Date: new Date(fugitiveJSON.date * 1000),
          Latitude: fugitiveJSON.latitude,
          Longitude: fugitiveJSON.longitude
        };
      });
    });
  }

  alertPolice() {
    this.http.post(`${this.alertUrl}?token=${sessionStorage.getItem('token')}`, this.fugitiveJSONArrayCache, this.httpOptions).subscribe();
  }

}
