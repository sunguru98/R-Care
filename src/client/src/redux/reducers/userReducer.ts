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
  const {
    payload: { user, accessToken }
  } = <SetUserAction>action;
  const { payload } = <SetUserLoadingAction>action;

  switch (type) {
    case 'SET_USER':
      return <UserState>{ ...state, user, accessToken };
    case 'CLEAR_USER':
      return <UserState>{ user: null, accessToken: null };
    case 'SET_USER_LOADING':
      return <UserState>{ ...state, userLoading: payload };
    case 'SET_USER_ERRORS':
      return <UserState>{
        ...state,
        errors: (action as SetUserErrorsAction).payload
      };
    case 'CLEAR_USER_ERRORS':
      return <UserState>{ ...state, errors: null };
    case 'RESET_USER_STATE':
      return <UserState>{
        errors: null,
        accessToken: null,
        user: null,
        userLoading: false
      };
    default:
      return state;
  }
};
