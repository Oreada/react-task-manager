import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllColumnsOfBoard } from 'api/columns/getAllColumnsOfBoard';
import { getAllTasksOfColumn } from 'api/tasks/getAllTasksOfColumn';
import { AddColumnType, ColumnType, TaskType } from 'types/types';
import { ASYNC_ACTION_NAMES, BoardStateKeys, INITIAL_BOARD_STATE } from './constants';
import { SLICE_NAMES } from './constants';
import { BoardStateType, GetColumnsArgsType } from './model';

// export const getColumnsThunk = createAsyncThunk<Array<AddColumnType>, GetColumnsArgsType>(
//   ASYNC_ACTION_NAMES.getColumns,
//   async ({ token, idBoard }: GetColumnsArgsType) => {
//     const columnsOfBoard = await getAllColumnsOfBoard(token, idBoard);
//     return await Promise.all(
//       columnsOfBoard.map(async (column) => {
//         const tasksOfColumn = await getAllTasksOfColumn(token, idBoard, column._id);
//         return {
//           ...column,
//           tasks: tasksOfColumn,
//         };
//       })
//     );
//   }
// );

export const getColumnsThunk = createAsyncThunk<Array<ColumnType>, GetColumnsArgsType>(
  ASYNC_ACTION_NAMES.getColumns,
  async ({ token, idBoard }: GetColumnsArgsType) => {
    return await getAllColumnsOfBoard(token, idBoard);
  }
);

const boardSlice = createSlice({
  name: SLICE_NAMES.board,
  initialState: INITIAL_BOARD_STATE,
  reducers: {
    setColumns(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.columns>>) {
      state.columns = action.payload.columns;
    },
    setBoardId(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.idBoard>>) {
      state.idBoard = action.payload.idBoard;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumnsThunk.pending, (state) => {
        state.isLoading = true;
        state.columns = [];
      })
      .addCase(getColumnsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = action.payload;
      });
  },
});

export const { setColumns, setBoardId } = boardSlice.actions;

export default boardSlice.reducer;
