import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { signInUser, registerUser } from '../redux/actions/userActions';
import { Redirect, Link } from 'react-router-dom';

interface LandingPageProps extends ReduxProps {}
type ReduxProps = ConnectedProps<typeof connector>;

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  return user ? (
    <Redirect to='/dashboard' />
  ) : (
    <section>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
    </section>
  );
};

const mapStateToProps = ({ user: { user } }: RootState) => ({ user });
const mapDispatchToProps = { signInUser, registerUser };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage);
