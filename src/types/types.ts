export type BodyForSignUp = {
  name: string;
  login: string;
  password: string;
};

export type UserInfo = {
  _id: string;
  name: string;
  login: string;
};

export type SignUpError = {
  statusCode: number | null;
  message: string;
};

export type BodyForSignIn = {
  login: string;
  password: string;
};

export type SignInResult = {
  token: 'string';
};

export type Board = {
  _id: 'Board id';
  title: 'Board title';
  owner: 'userId of owner';
  users: Array<string>; // ["userId of invited user #1", "userId of invited user #2"]
};
