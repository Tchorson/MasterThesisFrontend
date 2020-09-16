import { Component, OnInit } from '@angular/core';
import {Data} from '../../../../models/Data';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  dailyHeaders = ['User', 'Device', 'Date'];
  dailyContainer: Data[];
  dailyUrl = 'http://localhost:8081/daily-data';

  constructor() { }

  ngOnInit(): void {
  }

}
