import { InputLabel, Input, Group } from './form-input.styles';

const FormInput = ({ label, ...inputProps }) => {
  return (
    <Group>
      <Input {...inputProps} />
      {label && (
        <InputLabel shrink={inputProps.value.length}>{label}</InputLabel>
      )}
    </Group>
  );
};

export default FormInput;
