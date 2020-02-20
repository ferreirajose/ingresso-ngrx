import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';
import { dashboardRoutes } from './dashboard.routes';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
