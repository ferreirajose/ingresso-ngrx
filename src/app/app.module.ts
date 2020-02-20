import { BrowserModule } from '@angular/platform-browser';

import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

// FireBase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { AngularFireAuth } from 'angularfire2/auth';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Reducers
import { appReducers } from './app-reducer';

// Environment
import { environment } from 'src/environments/environment';

// Module
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { TicketModule } from './ticket/ticket.module';
import { DashbordModule } from './dashboard/dashbord.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TicketModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
