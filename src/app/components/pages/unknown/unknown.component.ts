import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unknown} from '../../../models/Unknown';
import {HttpClient} from '@angular/common/http';
import {EncryptionService} from '../../../services/encryption.service';
import {CronJob} from 'cron';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.css']
})
export class UnknownComponent implements OnInit {
  @Input() unknown: Unknown;
  @Output() idk: EventEmitter<string> = new EventEmitter();

  unknownHeader = ['User'];

  unknownUsers: string[];

  getUnknownsUrl = 'http://localhost:8081/missing-users';


  constructor(private http: HttpClient, private cryptingService: EncryptionService) {
  }

  ngOnInit(): void {
    this.getUnknown();
    const job = new CronJob('0/30 * * * * *', () => {
      this.getUnknown();
    }, null, true, 'Europe/Warsaw');
    job.start();
  }

  getUnknown() {
    return this.http.get<string[]>(`${this.getUnknownsUrl}?token=${sessionStorage.getItem('token')}`)
      .subscribe(phoneNumbersArray => {
        const decryptedUsers = [];
        console.log(phoneNumbersArray);
        console.log('-------------');
        phoneNumbersArray.forEach(encryptedPhoneNumber => {
          decryptedUsers.push(this.cryptingService.hex2a(this.cryptingService.decrypt(encryptedPhoneNumber)));
        });
        this.unknownUsers = decryptedUsers;
        console.log(this.unknownUsers);
      });
  }

}
