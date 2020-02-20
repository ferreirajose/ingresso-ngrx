import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/app-reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userName: string;
  public subscription: Subscription;

  constructor(
    private store: Store<AppState>
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.store.select('authUser')
      .pipe(
        filter(auth => auth.user !== null)
      ).subscribe(auth => {
        this.userName = auth.user.name;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
