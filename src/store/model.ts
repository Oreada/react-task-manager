import {
  AddColumnType,
  Board,
  BodyForBoard,
  BodyForColumnsSetOrder,
  BodyForTask,
  ColumnType,
  TaskType,
} from 'types/types';
import { store } from './appStore';

export type BoardStateType = {
  columns: ColumnType[];
  idBoard: string;
  isLoading: boolean;
};

export type MainStateType = {
  boards: Board[];
  isLoading: boolean;
};

export type ColumnStateType = {
  tasks: {
    [key: string]: TaskType[];
  };
  isLoading: boolean;
};

export type GetBoardArgsType = {
  token: string;
};

export type GetColumnsArgsType = {
  token: string;
  idBoard: string;
};

export type GetTasksArgsType = {
  token: string;
  idBoard: string;
  idColumn: string;
};

export type CreateBoardArgsType = {
  token: string;
  body: BodyForBoard;
};

export type CreateTaskArgsType = {
  token: string;
  idBoard: string;
  idColumn: string;
  body: BodyForTask;
};

export type ReoderColumnsArgsType = {
  token: string;
  body: BodyForColumnsSetOrder[];
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
