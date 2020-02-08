import React, { ChangeEvent, Fragment } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../types/redux/reducers/rootReducer.type';

type InputFieldProps =
  | {
      isTextArea: false;
      disabled?: boolean;
      type: string;
      name: string;
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      placeholder: string;
      value: string;
      required?: boolean;
    }
  | {
      isTextArea: true;
      disabled?: boolean;
      type: string;
      name: string;
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      placeholder: string;
      value: string;
      children: string;
      required?: boolean;
    };

type ReduxProps = ConnectedProps<typeof connector>;

const InputField: React.FC<InputFieldProps & ReduxProps> = ({
  type,
  name,
  disabled,
  placeholder,
  value,
  isTextArea,
  children,
  required,
  onChange,
  errors
}) => {
  const isError = errors && errors.find(e => e.param === name);
  return (
    <div className='InputField'>
      {isTextArea === true ? (
        <Fragment>
          <textarea
            disabled={disabled}
            className={`InputField__textarea ${isError ? 'error' : ''} ${
              disabled ? 'disabled' : ''
            }`}
            onChange={
              onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void
            }
            name={name}
            required={required ?? false}
            placeholder={placeholder}>
            {children}
          </textarea>
          {isError ? (
            <small className='InputField__error'>{isError.msg}</small>
          ) : null}
        </Fragment>
      ) : (
        <Fragment>
          <input
            disabled={disabled}
            className={`InputField__input ${isError ? 'error' : ''} ${
              disabled ? 'disabled' : ''
            }`}
            onChange={
              onChange as (event: ChangeEvent<HTMLInputElement>) => void
            }
            name={name}
            required={required ?? false}
            type={type}
            value={value}
            placeholder={placeholder}
          />
          {isError ? (
            <small className='InputField__error'>{isError.msg}</small>
          ) : null}
        </Fragment>
      )}
    </div>
  );
};

const connector = connect((state: RootState) => ({
  errors: state.user.errors
}));

export default connector(InputField);
