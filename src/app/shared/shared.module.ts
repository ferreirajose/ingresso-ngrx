import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { ValidInputDirective } from './directive/valid-input.directive';
import { EntradaPipe } from './pipe/entrada.pipe';

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
    SidebarComponent,
    EntradaPipe
  ],
  exports: [
    ValidInputDirective,
    AlertComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    EntradaPipe
  ],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class SharedModule { }
