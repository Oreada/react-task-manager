export type BodyForSignUp = {
  name: string;
  login: string;
  password: string;
};

export type SignUpResult = {
  _id: string;
  name: string;
  login: string;
};

export type SignUpError = {
  statusCode: number | null;
  message: string;
};

export type TypeField = 'name' | 'login' | 'password';

export type TypeValidationRequirements = {
  isEmpty: boolean;
  isMinLength: number;
  isEmptyText: string;
  isMinLengthText: string;
  isRegularMatch: RegExp;
  isRegularMatchText: string;
};

export type TypeValidationForm = {
  [key in TypeField]: TypeValidationRequirements;
};

export type TypeFormInput = {
  label: string;
  type: string;
  name: TypeField;
  required: boolean;
  icon: JSX.Element;
  minlength: number;
  validation: TypeValidationRequirements;
};

export type TypeFormInputsContent = {
  label: string;
  type: string;
  name: TypeField;
  required: boolean;
  icon: JSX.Element;
  minlength: number;
  validation: TypeValidationRequirements;
};

export interface IInput {
  name: TypeField;
  isError: boolean;
  errorText: string;
  value: string;
  isLeave: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}
