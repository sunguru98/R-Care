import React, { useEffect } from 'react';
import Axios from 'axios';
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

type ReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<ReduxProps> = ({ accessToken }) => {
  useEffect(() => {
    if (accessToken)
      Axios.defaults.headers.common['Authorization'] = accessToken;
  });
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
