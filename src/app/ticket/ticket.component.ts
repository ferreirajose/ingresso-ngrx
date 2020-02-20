import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DocumentReference } from 'angularfire2/firestore';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppTicketState } from './../shared/reducer/ticket.reducer';

import { ActivateLoading, DesactivateLoading } from '../shared/actions/actions';

import { Message } from '../shared/enum/message.enum';
import { Entrada } from './enum/entrada.enum';

import { TicketModel } from './models/ticket.model';
import { TicketService } from './services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit, OnDestroy {

  public formTicket: FormGroup;
  public type: Entrada;
  public loading: boolean;

  private subscription: Subscription;

  constructor(
    private store: Store<AppTicketState>,
    private ticketService: TicketService,
    private fb: FormBuilder
  ) {
    this.type = Entrada.ENTRADA;
  }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get isFormValid(): boolean {
    return this.formTicket.invalid;
  }

  public get entrada(): Entrada {
    return Entrada.ENTRADA;
  }

  public get saida(): Entrada {
    return Entrada.SAIDA;
  }

  public save(): void {
    if (this.formTicket.invalid) {
      alert(Message.CAMPOS_OBRIGATORIOS);
      return;
    }

    const ticket = new TicketModel({...this.formTicket.value, type: this.type});
    this.store.dispatch(new ActivateLoading());

    this.ticketService.createTicket(ticket).then((val: DocumentReference) => {
      console.log(val);
      this.formTicket.reset();
      // Finalizando loading
      this.store.dispatch(new DesactivateLoading());

    }).catch(erro => {
      console.log(erro);
      this.formTicket.reset();
      // Finalizando loading
      this.store.dispatch(new DesactivateLoading());

    });

  }

  private initForm(): void {
    this.formTicket = this.fb.group({
      description: ['', Validators.required],
      price: ['', Validators.min(0)]
    });
  }

}
