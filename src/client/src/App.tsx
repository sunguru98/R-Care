import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import RouteAlterPage from './pages/RouteAlterPage';

const App = () => {
  console.log(process.env);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route exact path='/dashboard' component={DashboardPage} />
        <Route exact path='/route/create' component={RouteAlterPage} />
        <Route exact path='/route/edit/:routeId' component={RouteAlterPage} />
        <Redirect to='/' />
      </Switch>
    </React.Fragment>
  );
};

export default App;
