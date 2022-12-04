import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createColumn } from 'api/columns/createColumn';
import { getAllColumnsOfBoard } from 'api/columns/getAllColumnsOfBoard';
import { getTasksByIdBoard } from 'api/tasks/getTasksByIdBoard';
import { getTasksByIdUser } from 'api/tasks/getTasksByIdUser';
import { getTasksBySearching } from 'api/tasks/getTasksBySearching';
import { getTaskByColumn } from 'helpers/getTaskByColumn';
import { ColumnType, TaskType } from 'types/types';
import {
  BoardStateKeys,
  INITIAL_BOARD_STATE,
  ReducerNameActionTypes,
  SLICE_NAMES,
} from './constants';
import {
  BoardStateType,
  GetBoardDataArgsType,
  GetSearchingTasksArgsType,
  SetColumnsDataArgsType,
} from './model';

export const getBoardData = createAsyncThunk<[ColumnType[], TaskType[]], GetBoardDataArgsType>(
  ReducerNameActionTypes.getBoardData,
  async ({ token, idBoard }: GetBoardDataArgsType) => {
    const [tasks, columns] = await Promise.all([
      getTasksByIdBoard(token, idBoard),
      getAllColumnsOfBoard(token, idBoard),
    ]);

    return [columns, tasks];
  }
);

export const getSearchingTasks = createAsyncThunk<TaskType[], GetSearchingTasksArgsType>(
  ReducerNameActionTypes.getSearchingTasks,
  async ({ token, searchValue }: GetSearchingTasksArgsType) => {
    const [matchTitle, matchUser] = await Promise.all([
      getTasksBySearching(token, searchValue),
      getTasksByIdUser(token, searchValue),
    ]);

    return [
      ...matchTitle,
      ...matchUser.filter(
        (taskByUser) => !matchTitle.find((taskByTitle) => taskByTitle._id === taskByUser._id)
      ),
    ];
  }
);

const boardSlice = createSlice({
  name: SLICE_NAMES.board,
  initialState: INITIAL_BOARD_STATE,
  reducers: {
    setColumns(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.columns>>) {
      state.columns = action.payload.columns;
    },
    setTasks(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.tasks>>) {
      state.tasks = action.payload.tasks;
    },
    setBoardTitle(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.titleBoard>>) {
      state.titleBoard = action.payload.titleBoard;
    },
    setTasksByColumn(
      state,
      action: PayloadAction<Pick<BoardStateType, BoardStateKeys.taskByColumns>>
    ) {
      state.taskByColumns = action.payload.taskByColumns;
    },
    setSearchValue(state, action: PayloadAction<Pick<BoardStateType, BoardStateKeys.searchValue>>) {
      state.searchValue = action.payload.searchValue;
    },
    setFoundedTasks(
      state,
      action: PayloadAction<Pick<BoardStateType, BoardStateKeys.foundedTasks>>
    ) {
      state.foundedTasks = action.payload.foundedTasks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardData.pending, (state) => {
        state.isLoading = true;
        state.columns = [];
        state.tasks = [];
      })
      .addCase(getBoardData.fulfilled, (state, action) => {
        state.isLoading = false;
        const [columns, tasks] = action.payload;
        state.columns = columns;
        state.taskByColumns = getTaskByColumn(tasks, columns);
      })
      .addCase(getSearchingTasks.pending, (state) => {
        state.isLoading = true;
        state.foundedTasks = [];
      })
      .addCase(getSearchingTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.foundedTasks = action.payload;
      });
  },
});

export const {
  setColumns,
  setTasks,
  setBoardTitle,
  setTasksByColumn,
  setSearchValue,
  setFoundedTasks,
} = boardSlice.actions;

export default boardSlice.reducer;
