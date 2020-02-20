import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { SharedModule } from '../shared/shared.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers: [AngularFireAuth]
})
export class AuthModule { }
