import React from 'react';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { connect, ConnectedProps } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps extends ReduxProps, RouteProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  user,
  component: Component,
  ...rest
}) => {
  return user ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to='/login' />
  );
};

const mapStateToProps = ({ user: { user } }: RootState) => ({ user });
const connector = connect(mapStateToProps);

export default connector(PrivateRoute);
