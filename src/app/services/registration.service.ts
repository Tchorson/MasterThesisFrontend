import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationJSON} from '../json/RegistrationJSON';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  getRegistrationsUrl = 'http://localhost:8081/get-users-without-decision';
  sendApprovalDecisionsUrl = 'http://localhost:8081/send-approval-decisions';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  getRequests(): Observable<RegistrationJSON[]>{
    return this.http.get<RegistrationJSON[]>(`${this.getRegistrationsUrl}?token=${sessionStorage.getItem('token')}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  sendApprovalDecisions(registrationArray: RegistrationJSON[]): Observable<any>{
    return this.http.post(`${this.sendApprovalDecisionsUrl}?token=${sessionStorage.getItem('token')}`, registrationArray, this.httpOptions);
  }

  constructor(private http: HttpClient) { }

}
