import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app-reducer';

import { AuthService } from 'src/app/auth/services/auth.service';
import { UnSetUserAction } from '../../actions/actions-auth';
import { UnSetItemsAction } from '../../actions/actions-ticket';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy{

  public userName: string;
  public subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('authUser')
      .pipe(
        filter(auth => auth.user !== null)
      ).subscribe(auth => {

        this.userName = auth.user.name;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logout().then(res => {
      this.router.navigate(['/login']);
      this.store.dispatch(new UnSetUserAction()); // removendo usuario do state quando realizar o logout
      this.store.dispatch(new UnSetItemsAction()); // removendo os items relacionados ao usuario do state quando realizar o logout
    }).catch(erro => {
      console.log(erro);
    });
  }

}
