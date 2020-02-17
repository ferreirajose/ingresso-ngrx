import { UiActions } from '../enum/ui-actions.enum';
import { UiLoading } from '../state/ui-loading.interface';

import * as fromUI from '../actions/actions';

const INITIAL_STATE: UiLoading = {
  isLoading: false
};

export function uiReducer(state = INITIAL_STATE, actions: fromUI.action): UiLoading {
  switch (actions.type) {
    case UiActions.ACTIVATE_LOADING:

      return {
        isLoading: true
      };

    case UiActions.DESACTIVATE_LOADING:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

