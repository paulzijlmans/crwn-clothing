import { FC, InputHTMLAttributes } from 'react';
import { InputLabel, Input, Group } from './form-input.styles';

type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...inputProps }) => {
  return (
    <Group>
      <Input {...inputProps} />
      {label && (
        <InputLabel
          shrink={Boolean(
            inputProps.value &&
              typeof inputProps.value === 'string' &&
              inputProps.value.length
          )}
        >
          {label}
        </InputLabel>
      )}
    </Group>
  );
};

export default FormInput;
