import { store } from './appStore';

export type BoardStateType = {
  // dragTaskData: {
  //   indexTask: number;
  //   indexColumn: number;
  // } | null;
  tasks: number[] | null;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
