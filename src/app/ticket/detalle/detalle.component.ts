import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppTicketState } from './../../shared/reducer/ticket.reducer';

import { Entrada } from './../enum/entrada.enum';

import { TicketModel } from './../models/ticket.model';

import { TicketService } from './../services/ticket.service';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {

  public ticketList: Array<TicketModel>;
  constructor(
    private store: Store<AppTicketState>,
    private ticketService: TicketService
  ) {
    this.ticketList = [];
  }

  ngOnInit(): void {
    this.store.select('ticket').subscribe(({items}) => {
      this.ticketList = items;
    });
  }

  public get entrada(): Entrada {
    return Entrada.ENTRADA;
  }

  public get saida(): Entrada {
    return Entrada.SAIDA;
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
