import React from 'react';

interface OptionValue {
  value: string;
  text: string;
  isDisabled?: boolean;
}

interface SelectFieldProps {
  className: string;
  optionValues: OptionValue[];
  disabled?: boolean;
  name?: string;
  required?: boolean;
  value?: string | string[] | number;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  required,
  value,
  optionValues,
  onChange,
  className
}) => {
  return (
    <select
      className={className}
      value={value}
      name={name}
      required={required}
      onChange={onChange}>
      {optionValues.map(({ value, isDisabled, text }, index) => (
        <option key={index} value={value} disabled={isDisabled}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
