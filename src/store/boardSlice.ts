import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_BOARD_STATE } from './constants';
import { SLICE_NAMES } from './constants';
import { BoardStateType } from './model';

const boardSlice = createSlice({
  name: SLICE_NAMES.board,
  initialState: INITIAL_BOARD_STATE,
  reducers: {
    // dragTask(state, action: PayloadAction<BoardStateType>) {
    //   state.dragTaskData = action.payload.dragTaskData;
    // },
    setTasks(state, action: PayloadAction<BoardStateType>) {
      state.tasks = action.payload.tasks;
    },
  },
});

export const { setTasks } = boardSlice.actions;

export default boardSlice.reducer;
