import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Registration } from '../../../models/Registration';
import { RegistrationService } from '../../../services/registration.service';
import {RegistrationJSON} from '../../../json/RegistrationJSON';
import {CronJob} from 'cron';
import {EncryptionService} from '../../../services/encryption.service';
import * as CryptoJS from 'crypto-js';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @Input() registrationRequest: Registration;
  @Output() deleteMarkedApprovals: EventEmitter<Registration> = new EventEmitter();

  registrationsContener: Registration[];

  constructor(private registrationService: RegistrationService, private encryptionService: EncryptionService) { }

  headers = ['approve', 'number', 'date', 'latitude', 'longitude', 'status'];

  registrationProperties = ['number', 'date', 'latitude', 'longitude', 'status'];

  ngOnInit(): void {
    this.getRegistrationRequests();
    const job = new CronJob('0/30 * * * * *', () => {
      this.getRegistrationRequests();
    }, null, true, 'Europe/Warsaw');
    job.start();
  }


  getRegistrationRequests(): void{
    this.registrationService.getRequests().subscribe(registrationJSONArray => {
      this.registrationsContener = registrationJSONArray.map(
        registrationJson => {
          let key = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('key'));
          let iv = CryptoJS.enc.Utf8.parse(sessionStorage.getItem('iv'));
          let data = this.encryptionService.hex2a(CryptoJS.AES.decrypt(registrationJson.phoneNumber, key, { iv: iv }).toString());
          return {
            number: data, latitude: registrationJson.lat, longitude: registrationJson.lng,
            date: new Date(registrationJson.walkTimestamp * 1000), status: registrationJson.approved
          };
        });
    });
  }

  onToggle(registrationRequest: Registration) {
    registrationRequest.status === undefined ? registrationRequest.status = true : registrationRequest.status = !registrationRequest.status;
  }

  sendApprovals(registrationArray: Registration[]){
    this.registrationService.sendApprovalDecisions(
      registrationArray.filter(registration => registration.status !== null)
        .map(registrationModel => new RegistrationJSON(
          this.encryptionService.encrypt(registrationModel.number),
          registrationModel.latitude,
          registrationModel.longitude,
          registrationModel.date,
          registrationModel.status))
    ).subscribe();
    this.registrationsContener = registrationArray.filter(registration => registration.status === null);
  }
}
