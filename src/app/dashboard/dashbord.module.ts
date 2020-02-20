import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashbordRoutingModule } from './dashbord-routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    DashbordRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class DashbordModule { }
