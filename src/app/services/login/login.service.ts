import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Credentials} from '../../models/Credentials';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class Login {


  loginUrl = 'http://localhost:8081/login';
  logoutUrl = 'http://localhost:8081/logout';
  sessionUrl = 'http://localhost:8081/session';

  headers = new HttpHeaders().set('Content-Type', 'application/json');


  httpOptions = {
    headers: this.headers,
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) {
  }

  async login(username, password, keyString, ivString) {
    const token = sessionStorage.getItem('token');
    if (token != null && token === 'IM_USED') {
      console.log('ALREADY LOGGED');
      return;
    }

    const key = CryptoJS.enc.Utf8.parse(keyString);
    const iv = CryptoJS.enc.Utf8.parse(ivString);

    const chiperUsername = CryptoJS.AES.encrypt(username, key, { iv: iv });
    const chiperPassword = CryptoJS.AES.encrypt(password, key, { iv: iv });

    const response = await this.http.post<string>(this.loginUrl, new Credentials(chiperUsername.toString(), chiperPassword.toString(), null, null),
      this.httpOptions).toPromise();
    return response;
  }

  logout() {
    const token = sessionStorage.getItem('token');
    const url = `${this.logoutUrl}?token=${token}`;
    this.removeData();
    this.http.post<string>(url, this.httpOptions).subscribe(log => console.log(log));
  }

  removeData() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('iv');
  }

  isLogged(){
    return sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined;
  }

  session() {
    const token = sessionStorage.getItem('token');
    const url = `${this.sessionUrl}?token=${token}`;
    return this.http.post<string>(url, null, this.httpOptions).toPromise();
  }
}
