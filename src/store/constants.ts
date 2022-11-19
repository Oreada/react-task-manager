import { BoardStateType, MainStateType } from './model';

export const INITIAL_MAIN_STATE: MainStateType = {
  boards: [],
  isLoading: false,
};

export const INITIAL_BOARD_STATE: BoardStateType = {
  columns: [],
  allTasks: [],
  idBoard: '',
  isLoading: false,
};

export enum BoardStateKeys {
  columns = 'columns',
  allTasks = 'allTasks',
  isLoading = 'isLoading',
  idBoard = 'idBoard',
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
}
