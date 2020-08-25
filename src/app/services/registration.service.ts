import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationJSON} from '../models/RegistrationJSON';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  getRegistrationsUrl: string = 'http://localhost:8081/get-users-without-decision';
  sendApprovalDecisionsUrl: string = 'http://localhost:8081/send-approval-decisions';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  getRequests(): Observable<RegistrationJSON[]>{
    return this.http.get<RegistrationJSON[]>(this.getRegistrationsUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendApprovalDecisions(registrationArray: RegistrationJSON[]): Observable<any>{
    return this.http.post(this.sendApprovalDecisionsUrl, registrationArray, this.httpOptions);
  }

  constructor(private http: HttpClient) { }

}
