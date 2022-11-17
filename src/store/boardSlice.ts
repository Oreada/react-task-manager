import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumnsOfBoard } from 'api/columns/getAllColumnsOfBoard';
import { getTasksByIdBoard } from 'api/tasks/getTasksByIdBoard';
import { ColumnType, TaskType } from 'types/types';
import { ASYNC_ACTION_NAMES, BoardStateKeys, INITIAL_BOARD_STATE, SLICE_NAMES } from './constants';
import { BoardStateType, GetBoardDataArgsType } from './model';

export const getBoardData = createAsyncThunk<[ColumnType[], TaskType[]], GetBoardDataArgsType>(
  ASYNC_ACTION_NAMES.getBoardData,
  async ({ token, idBoard }: GetBoardDataArgsType) => {
    const columns = await getAllColumnsOfBoard(token, idBoard);
    const tasks = await getTasksByIdBoard(token, idBoard);
    return [columns, tasks];
  }
);

const boardSlice = createSlice({
  name: SLICE_NAMES.board,
  initialState: INITIAL_BOARD_STATE,
  reducers: {
    setColumns(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.columns>>) {
      state.columns = action.payload.columns;
    },
    setTasks(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.allTasks>>) {
      state.allTasks = action.payload.allTasks;
    },
    setBoardId(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.idBoard>>) {
      state.idBoard = action.payload.idBoard;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (state) => {
        state.isLoading = true;
        state.columns = [];
        state.allTasks = [];
      })
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.isLoading = false;
        const [columns, tasks] = action.payload;
        state.columns = columns;
        state.allTasks = tasks;
      });
  },
});

export const { setColumns, setBoardId, setTasks } = boardSlice.actions;

export default boardSlice.reducer;
