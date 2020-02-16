import { ActionReducerMap } from '@ngrx/store';

import { uiReducer } from './shared/reducer/ui.reducer';
import { authReducer } from './shared/reducer/auth.reducer';

import { UiLoading } from './shared/state/ui-loading.interface';
import { AuthState } from './shared/state/auth-state.interface';

export interface AppState {
  ui: UiLoading;
  authUser: AuthState;
}

/**
 * agrupar todos os reducers da aplicação, no momento existe apenas um reducer
 * que é um função uiReducer(), não esquece reducer é uma função ()
 **/

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  authUser: authReducer
};
