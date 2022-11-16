import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { TypeField, TypeFormInputsContent } from 'types/types';

const Cicleron = <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
const Mail = <MailOutlineIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;
const Lock = <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />;

const IS_EMPTY_TEXT = 'This field can`t be empty';
const MIN_LENGTH_TEXT = 'This field must contain at least';
const REGULAR_NAME_TEXT = 'You should only use letters and numbers';
const REGULAR_PASSWORD_TEXT = 'Use min one uppercase and one lowercase letter';

export const VALIDATION_FORM = {
  name: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 3,
    isMinLengthText: `${MIN_LENGTH_TEXT} 3 symbols`,
    isRegularMatch: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
    isRegularMatchText: REGULAR_NAME_TEXT,
  },
  login: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 3,
    isMinLengthText: `${MIN_LENGTH_TEXT} 3 symbols`,
    isRegularMatch: /^[а-яА-ЯёЁa-zA-Z0-9]+$/,
    isRegularMatchText: REGULAR_NAME_TEXT,
  },
  password: {
    isEmpty: true,
    isEmptyText: IS_EMPTY_TEXT,
    isMinLength: 8,
    isMinLengthText: `${MIN_LENGTH_TEXT} 8 symbols`,
    isRegularMatch: /(?=.*[A-Z])(?=.*[a-z]).*$/,
    isRegularMatchText: REGULAR_PASSWORD_TEXT,
  },
};

export const FORM_INPUTS: Record<TypeField, TypeFormInputsContent> = {
  name: {
    label: 'Name',
    type: 'text',
    name: 'name',
    required: true,
    icon: Cicleron,
    minlength: 3,
    validation: VALIDATION_FORM.name,
  },
  login: {
    label: 'Login',
    type: 'text',
    name: 'login',
    required: true,
    icon: Mail,
    minlength: 3,
    validation: VALIDATION_FORM.login,
  },
  password: {
    label: 'Password',
    type: 'password',
    name: 'password',
    required: true,
    icon: Lock,
    minlength: 8,
    validation: VALIDATION_FORM.password,
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
