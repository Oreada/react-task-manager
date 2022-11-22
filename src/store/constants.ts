import { AuthReducer, BoardStateType, MainStateType } from './model';

export const INITIAL_MAIN_STATE: MainStateType = {
  boards: [],
  isLoading: false,
};

export const INITIAL_BOARD_STATE: BoardStateType = {
  columns: [],
  tasks: [],
  taskByColumns: null,
  idBoard: '',
  titleBoard: '',
  isLoading: false,
};

export enum BoardStateKeys {
  columns = 'columns',
  tasks = 'tasks',
  taskByColumns = 'taskByColumns',
  isLoading = 'isLoading',
  idBoard = 'idBoard',
  titleBoard = 'titleBoard',
}

export enum MainStateKeys {
  boards = 'boards',
  isLoading = 'isLoading',
}

export enum SLICE_NAMES {
  board = 'board',
  main = 'main',
  column = 'column',
  auth = 'auth',
}

export enum ReducerNameActionTypes {
  getBoards = 'getBoards',
  createBoard = 'createBoard',
  getBoardData = 'getBoardData',
  deleteBoard = 'deleteBoard',
  editBoard = 'editBoard',
  setBoardTitle = 'setBoardTitle',
  getUserName = 'getUserName',
}

export const INITIAL_AUTH_STATE: AuthReducer = {
  id: null,
  login: null,
  token: null,
  user: null,
};
