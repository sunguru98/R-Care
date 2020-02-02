import { UserState } from '../../types/redux/reducers/userReducer.type';
import {
  UserActions,
  SetUserAction,
  SetUserLoadingAction
} from '../../types/redux/actions/userActions.type';

const initialState: UserState = {
  user: null,
  accessToken: null,
  expiresIn: null,
  userLoading: false
};

export default (state: UserState = initialState, action: UserActions) => {
  const { type } = action;
  const {
    payload: { user, accessToken, expiresIn }
  } = <SetUserAction>action;
  const { payload } = <SetUserLoadingAction>action;
  
  switch (type) {
    case 'SET_USER':
      return <UserState>{ ...state, user, accessToken, expiresIn };
    case 'CLEAR_USER':
      return <UserState>{ user: null, accessToken: null, expiresIn: null };
    case 'SET_USER_LOADING':
      return <UserState>{ ...state, userLoading: payload };
    default:
      return state;
  }
};
