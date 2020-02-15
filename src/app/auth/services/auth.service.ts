import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private authFire: AngularFireAuth
  ) { }

  public initAuthLister() {
    this.authFire.authState.subscribe(user => {
      console.log(user);
    }, (erro) => {
      console.log(erro);

    });
  }

  public isAuth(): Observable<boolean> {
    return this.authFire.authState.pipe(
      map(fbUser => {

        if (fbUser === null) {
          this.router.navigate(['/login']);
        }

        return fbUser !== null;
      })
    );
  }

  public createNewUser({email, password}: {email: string, password: string}): Promise<any> {
    return this.authFire.auth.createUserWithEmailAndPassword(email, password);
  }

  public login({email, password}: {email: string, password: string}): Promise<any> {
    return this.authFire.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.authFire.auth.signOut();
  }

}
