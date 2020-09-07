import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Login} from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private loginservice: Login) {
  }

  username: string;
  password: string;
  key: string;
  iv: string;

  ngOnInit(): void {
  }

   checkLogin() {
    if (this.username === undefined || this.password === undefined || this.key === undefined || this.iv === undefined ||
      this.username.trim() === '' || this.password.trim() === '' || this.key.trim() === '' || this.iv.trim() === '') {
      alert('BLANK FIELD DURING LOGIN');
    }
    else {
      this.loginservice.login(this.username, this.password, this.key, this.iv).then(token => {
        if (token.length === 30) {
          console.log('NAGIVATING TO MAIN');
          this.assignData(token, this.key, this.iv);
          this.router.navigate(['requests']);
        }
        else {
          alert('LOGIN ATTEMPT FAILED');
        }
      }).catch(err => alert('LOGIN ATTEMPT FAILED'));
    }
  }

  assignData(token?: string, key?: string, iv?: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('key', key);
    sessionStorage.setItem('iv', iv);
  }
}
