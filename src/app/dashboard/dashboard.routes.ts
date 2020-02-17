import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ticket/estadistica/estadistica.component';
import { TicketComponent } from '../ticket/ticket.component';
import { DetalleComponent } from '../ticket/detalle/detalle.component';



export const dashboardRoutes: Routes = [

 { path: '', component: EstadisticaComponent },
 { path: 'ingreso-egreso', component: TicketComponent },
 { path: 'detalle', component: DetalleComponent },

];
