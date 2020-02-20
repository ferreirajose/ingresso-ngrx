import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

import { Subscription } from 'rxjs';

// import { AppState } from './../../app-reducer';
import { AppTicketState } from './../../shared/reducer/ticket.reducer';

import { Entrada } from '../enum/entrada.enum';
import { TicketModel } from './../models/ticket.model';

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

   // Doughnut
   public doughnutChartLabels: Array<Label>;
   public doughnutChartData: MultiDataSet;
   public doughnutChartType: ChartType;

  constructor(
    private store: Store<AppTicketState>
  ) {
    this.doughnutChartType = 'doughnut';
    this.doughnutChartLabels = ['Entrada', 'Saida'];
    this.doughnutChartData = [];
    this.entrada = 0;
    this.saida = 0;
    this.totalEntrada = 0;
    this.totalSaida = 0;
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ticket').subscribe(({items}) => {
      console.log(items)
      this.counterEntradaSaida(items);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public get showChart(): boolean {
    return this.entrada > 0 || this.saida > 0;
  }

  /**
   *
   * @Todo refatora para utilizar o metodo counter
   */
  private counterEntradaSaida(ticket: Array<TicketModel>) {
    ticket.forEach(item => {
      // if (item.type === Entrada.ENTRADA) {
      //   this.entrada = this.counter(ticket);
      //   return;
      // }
      // this.saida = this.counter(ticket);

      if (item.type === Entrada.ENTRADA) {
        this.totalEntrada ++;
        this.entrada += Number(item.price);
        return;
      }

      this.totalSaida ++;
      this.saida += Number(item.price);

    });

    this.doughnutChartData = [ [this.entrada, this.saida] ];
  }

  private counter(ticket: Array<TicketModel>): number {
    return ticket.reduce((prevVal, elem) => {
      return prevVal + Number(elem.price);
    }, 0);
  }

}
