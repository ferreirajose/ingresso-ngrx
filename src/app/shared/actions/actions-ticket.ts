import { Action } from '@ngrx/store';

import { TicketModel } from './../../ticket/models/ticket.model';
import { TicketActions } from './../enum/ticket-actions.enum';

export class SetItemsAction implements Action {
    public readonly type = TicketActions.SET_ITEMS;

    constructor(public items: Array<TicketModel>) {}
}

export class UnSetItemsAction implements Action {
    public readonly type = TicketActions.UNSET_ITEMS;
}

export type actionsTycket = SetItemsAction | UnSetItemsAction;
