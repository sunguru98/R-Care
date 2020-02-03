import React, { FormEvent, useState, ChangeEvent } from 'react';
import { RegisterPayload } from '../types/redux/sagas/user.type';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../redux/actions/userActions';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';

type ReduxProps = ConnectedProps<typeof connector>;
interface LoginPageProps extends ReduxProps {}

const LoginPage: React.FC<LoginPageProps> = ({
  user,
  registerUser,
  userLoading
}) => {
  const [formState, setFormState] = useState<
    RegisterPayload & { cPassword: string }
  >({
    email: '',
    password: '',
    name: '',
    cPassword: ''
  });

  const { email, password, name, cPassword } = formState;
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password !== cPassword) return alert('Passwords do not match');
    registerUser({ email, password, name });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (user) return <Redirect to='/dashboard' />;

  return userLoading ? (
    <Spinner />
  ) : (
    <section>
      <form onSubmit={handleSubmit}>
        <InputField
          placeholder='Name'
          isTextArea={false}
          type='text'
          required
          name='name'
          value={name}
          onChange={handleChange}
        />
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
        <InputField
          placeholder='Confirm password'
          isTextArea={false}
          type='password'
          required
          name='cPassword'
          value={cPassword}
          onChange={handleChange}
        />
        <input type='submit' value='Register' />
      </form>
    </section>
  );
};

const mapStateToProps = ({ user: { user, userLoading } }: RootState) => ({
  user,
  userLoading
});
const mapDispatchToProps = { registerUser };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginPage);
