import { ActionReducerMap } from '@ngrx/store';

import { authReducer } from './shared/reducer/auth.reducer';
import { ticketReducer } from './shared/reducer/ticket.reducer';
import { uiReducer } from './shared/reducer/ui.reducer';

import { AuthState } from './shared/state/auth-state.interface';
import { TicketState } from './shared/state/ticket-state.interface';
import { UiLoading } from './shared/state/ui-loading.interface';

export interface AppState {
  ui: UiLoading;
  authUser: AuthState;
  ticket: TicketState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  authUser: authReducer,
  ticket: ticketReducer
};
