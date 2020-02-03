import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { logOutUser } from '../redux/actions/userActions';

type ReduxProps = ConnectedProps<typeof connector>;
interface HeaderProps extends ReduxProps {}

const Header: React.FC<HeaderProps> = ({ user, logOutUser }) => (
  <header>
    {!user ? (
      <Fragment>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </Fragment>
    ) : (
      <Fragment>
        <Link to='/dashboard'>Dashboard</Link>
        <span onClick={logOutUser}>Logout</span>
      </Fragment>
    )}
  </header>
);

const mapStateToProps = (state: RootState) => ({
  user: state.user.user
});

const mapDispatchToProps = {
  logOutUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Header);
