import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { logOutUser } from '../redux/actions/userActions';
import '../styles/components/Header.scss';

type ReduxProps = ConnectedProps<typeof connector>;
interface HeaderProps extends ReduxProps {}

const Header: React.FC<HeaderProps> = ({ user, logOutUser }) => (
  <header className='Header'>
    <Link to={user ? '/dashboard' : '/'} className='Header__logo'>
      <span className='Header__logo'>R</span>
      <span className='Header__logo purple'>-Care</span>
    </Link>
    <div className='Header__buttons'>
      {!user ? (
        <Fragment>
          <Link className='Button' to='/login'>
            Login
          </Link>
          <Link className='Button inverted' to='/register'>
            Register
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <Link className='Button' to='/dashboard'>
            Dashboard
          </Link>
          <span role='button' className='Button inverted' onClick={logOutUser}>
            Logout
          </span>
        </Fragment>
      )}
    </div>
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
