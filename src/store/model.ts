import { Board, BodyForBoard, BodyForColumnsSetOrder, ColumnType } from 'types/types';
import { store } from './appStore';

export type BoardStateType = {
  columns: ColumnType[];
  tasks: number[] | null;
  isLoading: boolean;
};

export type MainStateType = {
  boards: Board[];
  isLoading: boolean;
};

export type ColumnStateType = {
  tasks: number[];
  isLoading: boolean;
};

export type GetBoardArgsType = {
  token: string;
};

export type GetColumnsArgsType = {
  token: string;
  idBoard: string;
};

export type CreateBoardArgsType = {
  token: string;
  body: BodyForBoard;
};

export type ReoderColumnsArgsType = {
  token: string;
  body: BodyForColumnsSetOrder[];
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
