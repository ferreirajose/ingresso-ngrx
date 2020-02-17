import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';

import { ActivateLoading, DesactivateLoading } from 'src/app/shared/actions/actions';

import { AppState } from 'src/app/app-reducer';

import { AuthService } from '../services/auth.service';

import { Alert } from 'src/app/shared/components/alert/interface/alert.interface';
import { MessageServices } from 'src/app/shared/enum/message-services.enum';

import { User } from '../interface/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public formRegister: FormGroup;
  public alert: Alert;
  public erro: boolean;
  public loading: boolean;

  private subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService
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

  public save(): void {

    if (this.formRegister.invalid) {
      this.alert.message = 'Verifique os campos';
      this.erro = true;
      return;
    }

    // Iniciando Loading
    this.store.dispatch(new ActivateLoading());

    this.authService.createNewUser(this.formRegister.getRawValue()).then((res: firebase.auth.UserCredential) => {
      this.createNewUserInFirebase(res);
    }).catch(erro => {
      this.handleErroRegister(erro);
    });

  }

  private initForm(): void {
    this.formRegister = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  private createNewUserInFirebase(res: firebase.auth.UserCredential): void {
    const { name } = this.formRegister.getRawValue();
    const user: User = {
      uid: res.user.uid,
      name,
      email: res.user.email
    };

    this.afs.doc(`${user.uid}/user`).set(user).then(() => {
      this.router.navigate(['/dashbord']);

      // Finalizando loading
      this.store.dispatch(new DesactivateLoading());
    }).catch(erro => {
      // Finalizando loading
      this.store.dispatch(new DesactivateLoading());
      console.log(erro, 'create User');
    });

  }

  private handleErroRegister(error: Error | any): void {
    this.erro = true;

    const errorCode = error.code;
    const errorMessage = error.message;

    errorCode === MessageServices.AUTH_EMAIL_ALREADY ? this.alert.message = MessageServices.WRONG_USER : this.alert.message = errorMessage;

  }

}
