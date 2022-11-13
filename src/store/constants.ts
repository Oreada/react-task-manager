import { BoardStateType, MainStateType } from './model';

export const INITIAL_MAIN_STATE: MainStateType = {
  boards: [],
  isLoading: false,
};

export const INITIAL_BOARD_STATE: BoardStateType = {
  allColumns: [],
  allTasks: [],
  idBoard: '',
  isLoading: false,
};

export enum BoardStateKeys {
  allColumns = 'allColumns',
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
}

export enum ASYNC_ACTION_NAMES {
  getBoards = 'getBoards',
  createBoard = 'createBoard',
  getBoardData = 'getBoardData',
}
