import { TicketService } from './../ticket/services/ticket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.initTicketListener();
  }

}
