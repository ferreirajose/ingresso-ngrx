import { TicketModel } from './../models/ticket.model';
import { TicketState } from './../../shared/state/ticket-state.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './../../app-reducer';
import { tick } from '@angular/core/testing';
import { Entrada } from '../enum/entrada.enum';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public entrada: number;
  public saida: number;
  public totalEntrada: number;
  public totalSaida: number;

  public subscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
    this.entrada = 0;
    this.saida = 0;
    this.totalEntrada = 0;
    this.totalSaida = 0;
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ticket').subscribe(({items}) => {
      this.counterEntradaSaida(items);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private counterEntradaSaida(ticket: Array<TicketModel>) {
    ticket.forEach(item => {
      if (item.type === Entrada.ENTRADA) {
        this.entrada = this.counter(ticket);
        return;
      }

      this.saida = this.counter(ticket);
    });

  }

  private counter(ticket: Array<TicketModel>): number {
    return ticket.reduce((prevVal, elem) => {
      return prevVal + Number(elem.price);
    }, 0);
  }

}
