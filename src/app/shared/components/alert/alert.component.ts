import { Component, OnInit, Input } from '@angular/core';

import { Alert } from './interface/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() alertConfig: Alert;

  constructor() { }

  ngOnInit() {
  }

}
