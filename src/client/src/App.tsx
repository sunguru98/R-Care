import React, { useEffect } from 'react';
import Axios from 'axios';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RouteAlterPage from './pages/RouteAlterPage';

import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './types/redux/reducers/rootReducer.type';

type ReduxProps = ConnectedProps<typeof connector>;

const App: React.FC<ReduxProps> = ({ accessToken }) => {
  console.log(process.env)
  useEffect(() => {
    console.log(accessToken)
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
        <Route exact path='/route/create' component={RouteAlterPage} />
        <Route exact path='/route/edit/:routeId' component={RouteAlterPage} />
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
