import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuth();
  }

}
