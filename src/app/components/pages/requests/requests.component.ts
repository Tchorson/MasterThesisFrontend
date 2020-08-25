import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Registration } from '../../../models/Registration';
import { RegistrationService } from '../../../services/registration.service';
import {RegistrationJSON} from '../../../models/RegistrationJSON';
import {CronJob} from 'cron';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @Input() registrationRequest: Registration;
  @Output() deleteMarkedApprovals: EventEmitter<Registration> = new EventEmitter();

  registrations: Registration[];

  constructor(private registrationService: RegistrationService) { }

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
      this.registrations = registrationJSONArray.map(
        registrationJson => {
          return {
            number: registrationJson.phoneNumber, latitude: registrationJson.lat, longitude: registrationJson.lng,
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
      registrationArray.filter(registration => registration.status !== null).map(registrationModel => new RegistrationJSON(registrationModel.number, registrationModel.latitude, registrationModel.longitude, registrationModel.date, registrationModel.status))
    ).subscribe();
    this.registrations = registrationArray.filter(registration => registration.status === null);
  }
}
