import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../store/user/user.action';

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      alert('incorrect login data');
      console.log('error during login');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2> I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            type='button'
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
