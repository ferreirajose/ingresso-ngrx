import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Alert } from 'src/app/shared/components/alert/models/alert.interface';
import { MessageServices } from 'src/app/shared/enums/message-services.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public erro: boolean;
  public alert: Alert;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.erro = false;
    this.alert = {
      message: ''
    };
  }

  ngOnInit(): void {
    this.initForm();
  }

  public login(): void {
    this.authService.login(this.formLogin.getRawValue()).then(res => {
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

    errorCode === MessageServices.AUTH_WRONG ? this.alert.message = MessageServices.WRONG_PASSWORD : this.alert.message = errorMessage;

  }

}
