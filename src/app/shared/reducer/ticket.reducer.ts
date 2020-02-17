import { TicketState } from './../state/ticket-state.interface';
import { actionsTycket } from './../actions/actions-ticket';
import { TicketActions } from '../enum/ticket-actions.enum';

const INITIAL_STATE: TicketState = {
    items: []
};

export function ticketReducer(state = INITIAL_STATE, action: actionsTycket): TicketState {
    switch (action.type) {
        case TicketActions.SET_ITEMS:
            return {
                items: [ ...action.items.map(item => ( { ...item } ))]
            };
        case TicketActions.UNSET_ITEMS:
            return { items: [] };
        default:
            return state;
    }
}

