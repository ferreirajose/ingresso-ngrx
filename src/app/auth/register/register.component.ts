import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Alert } from 'src/app/shared/components/alert/models/alert.interface';
import { MessageServices } from 'src/app/shared/enums/message-services.enum';

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

    this.authService.createNewUser(this.formRegister.getRawValue()).then(res => {
      this.router.navigate(['/dashbord']);

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
