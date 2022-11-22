import { Cicleron, Lock, Mail, VALIDATION_FORM } from 'constants/constants';
import { TypeField, TypeFormInputsContent } from 'types/types';

export const FORM_INPUTS: Record<TypeField, TypeFormInputsContent> = {
  name: {
    label: 'Name',
    type: 'text',
    name: 'name',
    required: true,
    icon: Cicleron,
    minlength: 3,
    validation: VALIDATION_FORM.name,
    autocomplete: 'name',
  },
  login: {
    label: 'Login',
    type: 'text',
    name: 'login',
    required: true,
    icon: Mail,
    minlength: 3,
    validation: VALIDATION_FORM.login,
    autocomplete: 'nickname',
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
    icon: Lock,
    minlength: 8,
    validation: VALIDATION_FORM.password,
    autocomplete: 'current-password',
  },
};

export const FORM_TEXT = {
  titleIn: 'SignIn',
  titleUp: 'SignUp',
  buttonTextIn: 'Log in',
  buttonTextUp: 'Register',
  linkTextToPageUp: 'Create an account',
  linkTextToPageIn: 'I am already member',
};
