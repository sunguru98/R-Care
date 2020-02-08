import React, { FormEvent, useState, ChangeEvent, Fragment } from 'react';
import { LoginPayload } from '../types/redux/sagas/user.type';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { Redirect } from 'react-router-dom';
import { signInUser } from '../redux/actions/userActions';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';

type ReduxProps = ConnectedProps<typeof connector>;
interface LoginPageProps extends ReduxProps {}

const LoginPage: React.FC<LoginPageProps> = ({
  user,
  signInUser,
  userLoading
}) => {
  const [formState, setFormState] = useState<LoginPayload>({
    email: '',
    password: ''
  });

  const { email, password } = formState;
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    signInUser({ email, password });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (user) return <Redirect to='/dashboard' />;

  return (
    <section className='LoginPage page'>
      <form className='Form' onSubmit={handleSubmit}>
        <h1>{!userLoading ? 'Welcome back' : 'Please wait'}</h1>
        {userLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <InputField
              placeholder='Email'
              isTextArea={false}
              type='email'
              required
              name='email'
              value={email}
              onChange={handleChange}
            />
            <InputField
              placeholder='Password'
              isTextArea={false}
              type='password'
              required
              name='password'
              value={password}
              onChange={handleChange}
            />
            <input
              className={`Button ${userLoading ? 'disabled' : ''}`}
              disabled={userLoading}
              type='submit'
              value='Login'
            />
          </Fragment>
        )}
      </form>
    </section>
  );
};

const mapStateToProps = ({ user: { user, userLoading } }: RootState) => ({
  user,
  userLoading
});
const mapDispatchToProps = { signInUser };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);
