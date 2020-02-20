import { Injectable } from '@angular/core';

import { CanActivate, CanLoad } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {


  constructor(
    private authService: AuthService
  ) { }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuth();
  }

  public canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(take(1));
  }

}
