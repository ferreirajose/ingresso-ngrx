import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app-reducer';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';

import { Alert } from 'src/app/shared/components/alert/interface/alert.interface';
import { MessageServices } from 'src/app/shared/enum/message-services.enum';
import { DesactivateLoading, ActivateLoading } from 'src/app/shared/actions/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup;
  public erro: boolean;
  public alert: Alert;
  public loading: boolean;

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.erro = false;
    this.subscription = new Subscription();
    this.alert = {
      message: ''
    };
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

  public login(): void {
    if (this.formLogin.invalid) {
      this.alert.message = 'Erro ao efetuar Login';
      this.erro = true;
      return;
    }

    this.store.dispatch(new ActivateLoading());

    this.authService.login(this.formLogin.getRawValue()).then(res => {
      // Finalizando loading
      this.store.dispatch(new DesactivateLoading());

      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.handleErroLogin(error);
    });
  }

  private initForm(): void {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  private handleErroLogin(error: Error | any): void {
    this.erro = true;

    const errorCode = error.code;
    const errorMessage = error.message;

    // Finalizando loading
    this.store.dispatch(new DesactivateLoading());
    errorCode === MessageServices.AUTH_WRONG ? this.alert.message = MessageServices.WRONG_PASSWORD : this.alert.message = errorMessage;

  }

}
