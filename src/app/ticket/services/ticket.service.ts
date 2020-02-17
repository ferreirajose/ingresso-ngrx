import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from 'angularfire2/firestore';

import { TicketModel } from '../models/ticket.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) { }

  public createTicket(ticket: TicketModel): Promise<DocumentReference> {

    const { uid } = this.authService.getUser();

    const newTicket = {...ticket, uid};

    return this.afs.doc(`${uid}/ticket`).collection('items').add({...newTicket});

  }

}
