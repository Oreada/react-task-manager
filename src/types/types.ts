import { type } from 'os';

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
  token: string;
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

export type Column = {
  _id: string; // Column id
  title: string; // Column title
  order: number;
  boardId: string;
};

export type BodyForColumn = {
  title: string;
  order: number;
};

export type BodyForColumnsSet = {
  title: string;
  order: number;
  boardId: string;
};

export type BodyForColumnsSetOrder = {
  _id: string; // Column id
  order: number;
};

export type Task = {
  _id: string; // Task id
  title: string; // Task title
  order: number;
  boardId: string; // id of board
  columnId: string; // id of column
  description: string; // Task decription
  userId: string; // userId of task owner
  users: Array<string>; // ["userId of invited user #1", "userId of invited user #2"]
};
