import { Action } from '@ngrx/store';

import { AuthActions } from '../enums/auth.actions.enum';

import { User } from 'src/app/auth/models/user.model';

export class SetUserAction implements Action {
  public readonly type = AuthActions.SET_USER;

  constructor(public user: User) {}
}

export type actionsAuth = SetUserAction;
