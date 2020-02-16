import { Action } from '@ngrx/store';

import { UiActions } from '../enums/ui-actions.enum';

export class ActivateLoading implements Action {
    public readonly type = UiActions.ACTIVATE_LOADING;
}

export class DesactivateLoading implements Action {
  public readonly type = UiActions.DESACTIVATE_LOADING;
}


export type action = ActivateLoading | DesactivateLoading;
