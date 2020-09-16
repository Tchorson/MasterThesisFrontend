import { Component, OnInit } from '@angular/core';
import {Login} from '../../../services/login/login.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private loginService: Login) { }

  ngOnInit(): void {
  }

  isLogged(){
    return this.loginService.isLogged();
  }

}
