import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AngularFirestore, DocumentChangeAction, DocumentReference } from 'angularfire2/firestore';

import { filter, map, take } from 'rxjs/operators';

import { AppState } from 'src/app/app-reducer';

import { AuthService } from 'src/app/auth/services/auth.service';

import { TicketModel } from '../models/ticket.model';

import { SetItemsAction } from './../../shared/actions/actions-ticket';

import { AuthState } from './../../shared/state/auth-state.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  public initTicketListener() {
    this.store.select('authUser').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(
      (auth: AuthState) => this.ticketItems(auth.user.uid),
      (erro) => console.log(erro, 'initTicketListener')
    );
  }

  public createTicket(ticket: TicketModel): Promise<DocumentReference> {

    const { uid } = this.authService.getUser();
    const newTicket = {...ticket, uid};

    return this.afs.doc(`${uid}/ticket`).collection('items').add({...newTicket});

  }

  public removerTicket(uid: string): Promise<void> {
    const user = this.authService.getUser();
    return this.afs.doc(`${user.uid}/ticket/items/${uid}`).delete();
  }

  private ticketItems(uid: string): void {
    this.afs.collection(`${uid}/ticket/items`).snapshotChanges()
    .pipe(
      map((docData: DocumentChangeAction<unknown>[]) => {
        console.log(docData);
        
        return docData.map((doc: DocumentChangeAction<unknown>) => (
          {
            ...doc.payload.doc.data(),
            uid: doc.payload.doc.id
          }
        ));
      })
      //take(2) // unsubscribe
    )
    .subscribe((collection: Array<TicketModel>) => {
      //console.log(collection);
      
      this.store.dispatch(new SetItemsAction(collection));
    }, (erro) => {
        console.log(erro, 'ticketItems');
    });
  }


}
