import { BoardStateType, ColumnStateType, MainStateType } from './model';

export const INITIAL_MAIN_STATE: MainStateType = {
  boards: [],
  isLoading: false,
};

export const INITIAL_BOARD_STATE: BoardStateType = {
  columns: [],
  tasks: null,
  isLoading: false,
};

export const INITIAL_COLUMN_STATE: ColumnStateType = {
  tasks: [],
  isLoading: false,
};

export enum BoardStateKeys {
  columns = 'columns',
  tasks = 'tasks',
  isLoading = 'isLoading',
}

export enum MainStateKeys {
  boards = 'boards',
  isLoading = 'isLoading',
}

export enum ColumnStateKeys {
  tasks = 'tasks',
  isLoading = 'isLoading',
}

export enum SLICE_NAMES {
  board = 'board',
  main = 'main',
  column = 'column',
}

export enum ASYNC_ACTION_NAMES {
  getBoards = 'getBoards',
  getColumns = 'getColumns',
  createBoard = 'createBoard',
  reoderColumns = 'reoderColumns',
}
