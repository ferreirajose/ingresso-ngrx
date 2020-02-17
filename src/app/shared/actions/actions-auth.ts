import { Action } from '@ngrx/store';

import { AuthActions } from '../enum/auth.actions.enum';

import { User } from 'src/app/auth/interface/user.interface';

export class SetUserAction implements Action {
  public readonly type = AuthActions.SET_USER;

  constructor(public user: User) {}
}

export type actionsAuth = SetUserAction;
