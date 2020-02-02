import { UserState } from '../../types/redux/reducers/userReducer.type';
import {
  UserActions,
  SetUserAction,
  SetUserLoadingAction,
  SetUserErrorsAction
} from '../../types/redux/actions/userActions.type';

const initialState: UserState = {
  user: null,
  accessToken: null,
  userLoading: false,
  errors: null
};

export default (state: UserState = initialState, action: UserActions) => {
  const { type } = action;
  const { payload } = action as SetUserLoadingAction;
  const { payload: userPayload } = action as SetUserAction;
  switch (type) {
    case 'SET_USER':
      return {
        ...state,
        user: userPayload.user,
        accessToken: userPayload.accessToken
      } as UserState;
    case 'CLEAR_USER':
      return { user: null, accessToken: null } as UserState;
    case 'SET_USER_LOADING':
      return { ...state, userLoading: payload } as UserState;
    case 'SET_USER_ERRORS':
      return {
        ...state,
        errors: (action as SetUserErrorsAction).payload
      } as UserState;
    case 'CLEAR_USER_ERRORS':
      return { ...state, errors: null } as UserState;
    case 'RESET_USER_STATE':
      return {
        errors: null,
        accessToken: null,
        user: null,
        userLoading: false
      } as UserState;
    default:
      return state;
  }
};
