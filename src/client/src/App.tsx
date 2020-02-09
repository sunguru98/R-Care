import React, { useEffect } from 'react';
import Axios, { AxiosError } from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RouteUpdatePage from './pages/RouteUpdatePage';
import DashboardPage from './pages/DashboardPage';
import RouteCreatePage from './pages/RouteCreatePage';
import RouteBatchUploadPage from './pages/RouteBatchUploadPage';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './types/redux/reducers/rootReducer.type';
import history from './redux/createHistory';
import store from './redux/store';
import { UserLogoutAction } from './types/redux/actions/userActions.type';

type ReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<ReduxProps> = ({ accessToken }) => {
  useEffect(() => {
    if (accessToken) {
    }
    Axios.defaults.headers.common['Authorization'] = accessToken;
  });
  Axios.interceptors.response.use(
    res => Promise.resolve(res),
    (err: AxiosError<{ message: string; statusCode: number }>) => {
      if (err.response!.data.statusCode === 403) {
        alert('Session Expired. Kindly login again');
        store.dispatch<UserLogoutAction>({ type: 'USER_LOGOUT' });
        history.push('/login');
      } else throw err;
    }
  );
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <PrivateRoute exact path='/dashboard' component={DashboardPage} />
        <PrivateRoute exact path='/route/create' component={RouteCreatePage} />
        <PrivateRoute
          exact
          path='/route/create/multi'
          component={RouteBatchUploadPage}
        />
        <PrivateRoute
          exact
          path='/route/edit/:routeId'
          component={RouteUpdatePage}
        />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  accessToken: state.user.accessToken
});

const connector = connect(mapStateToProps);

export default connector(App);
