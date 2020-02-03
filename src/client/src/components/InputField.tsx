import React, { ChangeEvent } from 'react';

type InputFieldProps =
  | {
      isTextArea: false;
      type: string;
      name: string;
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      placeholder: string;
      value: string;
      required?: boolean;
    }
  | {
      isTextArea: true;
      type: string;
      name: string;
      onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
      placeholder: string;
      value: string;
      children: string;
      required?: boolean;
    };

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  isTextArea,
  children,
  required,
  onChange
}) => {
  return isTextArea === true ? (
    <textarea
      onChange={onChange as (event: ChangeEvent<HTMLTextAreaElement>) => void}
      name={name}
      required={required ?? false}
      placeholder={placeholder}>
      {children}
    </textarea>
  ) : (
    <input
      onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => void}
      name={name}
      required={required ?? false}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default InputField;
