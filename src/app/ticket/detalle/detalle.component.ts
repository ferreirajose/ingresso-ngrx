import { TicketService } from './../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import { AppState } from 'src/app/app-reducer';
import { TicketModel } from './../models/ticket.model';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  public ticketList: Array<TicketModel>;
  constructor(
    private store: Store<AppState>,
    private ticketService: TicketService
  ) {
    this.ticketList = [];
  }

  ngOnInit(): void {
    this.store.select('ticket').subscribe(({items}) => {
      this.ticketList = items;
    });
  }

  public edit(uid: string) {

  }

  public remover(uid: string) {
    this.ticketService.removerTicket(uid).then((val) => {
    }).catch(erro => {
      console.log(erro);
    });
  }

}
