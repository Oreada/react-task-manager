import { TasksByColumnsType } from 'components/Board/model';
import { Board, BodyForBoard, BodyForTask, ColumnType, TaskType } from 'types/types';
import { store } from './appStore';

export type BoardStateType = {
  columns: ColumnType[];
  tasks: TaskType[];
  taskByColumns: TasksByColumnsType | null;
  idBoard: string;
  titleBoard: string;
  isLoading: boolean;
};

export type MainStateType = {
  boards: Board[];
  isLoading: boolean;
};

export type GetBoardArgsType = {
  token: string;
};

export type GetBoardDataArgsType = {
  token: string;
  idBoard: string;
};

export type CreateBoardArgsType = {
  token: string;
  body: BodyForBoard;
};

export type DeleteBoardArgsType = {
  token: string;
  idBoard: string;
};

export type EditBoardArgsType = {
  token: string;
  idBoard: string;
  body: BodyForBoard;
};

export type CreateTaskArgsType = {
  token: string;
  idBoard: string;
  idColumn: string;
  body: BodyForTask;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthReducer = {
  id: string | null;
  login: string | null;
  token: string | null;
};
