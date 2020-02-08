import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { signInUser, registerUser } from '../redux/actions/userActions';
import { Redirect, Link } from 'react-router-dom';
import '../styles/pages/LandingPage.scss';

interface LandingPageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  return user ? (
    <Redirect to='/dashboard' />
  ) : (
    <section className='LandingPage page'>
      <h1 className='LandingPage__title xl'>Easy route management.</h1>
      <p className='LandingPage__description'>
        Change the way you view routes and analyse their paths with R-Care.
      </p>
      <div className='LandingPage__buttons'>
        <Link className='Button' to='/login'>
          Login
        </Link>
        <Link className='Button inverted' to='/register'>
          Register
        </Link>
      </div>
    </section>
  );
};

const mapStateToProps = ({ user: { user } }: RootState) => ({ user });
const mapDispatchToProps = { signInUser, registerUser };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
