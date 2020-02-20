import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { ticketReducer } from '../shared/reducer/ticket.reducer';

import { ChartsModule } from 'ng2-charts';

import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

import { TicketComponent } from './ticket.component';

import { SharedModule } from '../shared/shared.module';
import { DashbordModule } from '../dashboard/dashbord.module';

@NgModule({
  declarations: [
    TicketComponent,
    EstadisticaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    ReactiveFormsModule,
    DashbordModule,
    SharedModule,
    StoreModule.forFeature('ticket', ticketReducer)
  ]
})
export class TicketModule { }
