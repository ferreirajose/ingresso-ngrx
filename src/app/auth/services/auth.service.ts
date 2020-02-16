import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { SetUserAction } from 'src/app/shared/actions/actions-auth';

import { AppState } from 'src/app/app-reducer';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private afs: AngularFirestore,
    private authFire: AngularFireAuth
  ) {
    this.userSubscription = new Subscription();
  }

  // Metodo responsavel por ficar escutando modificações no Documento User no firebase e notificar a aplicação
  public initAuthLister(): void {
    this.authFire.authState.subscribe((user: firebase.User) => {

      user ? this.setUserAction(user) : this.userSubscription.unsubscribe();

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

  public createNewUser({email, password}: {email: string, password: string}): Promise<firebase.auth.UserCredential> {
    return this.authFire.auth.createUserWithEmailAndPassword(email, password);
  }

  public login({email, password}: {email: string, password: string}): Promise<any> {
    return this.authFire.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.authFire.auth.signOut();
  }

  private setUserAction(user: firebase.User): void {

    this.userSubscription = this.afs.doc(`${user.uid}/user`).valueChanges().subscribe((val: any) => {
      console.log(val);

      const userObj: User = {
        uid: val && val.uid || null,
        email: val && val.email || null,
        name: val && val.name || null
      };

      console.log(userObj);

      this.store.dispatch(new SetUserAction(userObj));

    });
  }

}
