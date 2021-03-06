import { AuthState } from '../state/auth-state.interface';

import * as fromAuth from '../actions/actions-auth';
import { AuthActions } from '../enum/auth.actions.enum';

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
    case AuthActions.UNSET_USER: // removendo usuario do state quando realizar o logout
      return {
        user: null
      };
    default:
      return state;
  }
}
