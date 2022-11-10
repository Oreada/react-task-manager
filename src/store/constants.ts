import { BoardStateType } from './model';

export const INITIAL_BOARD_STATE: BoardStateType = {
  // dragTaskData: null,
  tasks: null,
};

export enum SLICE_NAMES {
  board = 'board',
}
