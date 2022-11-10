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
  _id: string; // ID of board
  title: string;
  owner: string; // userId of owner
  users: Array<string>; // ["userId of invited user #1", "userId of invited user #2"]
};

export type BodyForBoard = {
  title: string;
  owner: string; // userId of owner
  users: Array<string>; // ["userId of invited user #1", "userId of invited user #2"]
};
