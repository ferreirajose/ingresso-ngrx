import { User } from 'src/app/auth/models/user.model';

import { AuthState } from '../state/auth-state.interface';

import * as fromAuth from '../actions/actions-auth';
import { AuthActions } from '../enums/auth.actions.enum';

const INITIAL_STATE: AuthState = {
  user: null
};

export function authReducer(state = INITIAL_STATE, actions: fromAuth.actionsAuth): AuthState {

  switch (actions.type) {
    case AuthActions.SET_USER:
      return {
        user: {
          ...actions.user
        }
      };

    default:
      return state;
  }
}
