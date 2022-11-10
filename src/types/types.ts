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
