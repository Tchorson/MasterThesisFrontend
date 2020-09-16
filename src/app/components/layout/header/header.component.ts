import { Component, OnInit } from '@angular/core';
import {Login} from '../../../services/login/login.service';
import {CronJob} from 'cron';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private loginService: Login) { }

  ngOnInit(): void {
    const job = new CronJob('0/30 * * * * *', () => {
      this.loginService.session().then(response => {
        if (response !== sessionStorage.getItem('token') || response === null) {
          this.loginService.logout();
          this.router.navigate(['']);
        }
      }).catch(error => {
        console.log(error);
      });
    }, null, true, 'Europe/Warsaw');
    job.start();
  }

  isLogged(){
    return this.loginService.isLogged();
  }

  logout(){
    this.loginService.logout();
  }
}
