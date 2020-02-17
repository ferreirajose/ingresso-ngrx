import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { ValidInputDirective } from './directive/valid-input.directive';

import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    ValidInputDirective,
    AlertComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    ValidInputDirective,
    AlertComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
