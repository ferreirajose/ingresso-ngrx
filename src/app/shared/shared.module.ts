import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidInputDirective } from './directive/valid-input.directive';

import { AlertComponent } from './components/alert/alert.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

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
    CommonModule
  ]
})
export class SharedModule { }
