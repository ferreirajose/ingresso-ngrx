import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';

import { Alert } from 'src/app/shared/components/alert/interface/alert.interface';
import { MessageServices } from 'src/app/shared/enums/message-services.enum';

import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public alert: Alert;
  public erro: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.erro = false;
    this.alert = {
      message: ''
    };
  }

  ngOnInit(): void {
    this.initForm();
  }

  public save(): void {

    if (this.formRegister.invalid) {
      return;
    }

    const { name } = this.formRegister.getRawValue();
    this.authService.createNewUser(this.formRegister.getRawValue()).then(res => {

      const user: User = {
        uid: res.user.uid,
        name,
        email: res.user.email
      };

      this.afs.doc(`${user.uid}/user`).set(user).then(() => {
        this.router.navigate(['/dashbord']);
      }).catch(erro => {
        console.log(erro, 'create User');
      });

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

  private handleErroRegister(error: Error | any): void {
    this.erro = true;

    const errorCode = error.code;
    const errorMessage = error.message;

    errorCode === MessageServices.AUTH_EMAIL_ALREADY ? this.alert.message = MessageServices.WRONG_USER : this.alert.message = errorMessage;

  }

}
