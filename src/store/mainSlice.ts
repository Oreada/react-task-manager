import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard } from 'api/boards/createBoard';
import { getAllBoards } from 'api/boards/getAllBoards';
import { Board } from 'types/types';
import { ASYNC_ACTION_NAMES, INITIAL_MAIN_STATE } from './constants';
import { SLICE_NAMES } from './constants';
import { CreateBoardArgsType, GetBoardArgsType } from './model';

export const getBoardsThunk = createAsyncThunk<Board[], GetBoardArgsType>(
  ASYNC_ACTION_NAMES.getBoards,
  async ({ token }: GetBoardArgsType) => {
    return await getAllBoards(token);
  }
);

export const createBoardThunk = createAsyncThunk<Board, CreateBoardArgsType>(
  ASYNC_ACTION_NAMES.createBoard,
  async ({ token, body }: CreateBoardArgsType) => {
    return await createBoard(token, body);
  }
);

const boardSlice = createSlice({
  name: SLICE_NAMES.main,
  initialState: INITIAL_MAIN_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoardsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload;
      })
      .addCase(createBoardThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards.push(action.payload);
      });
  },
});

export default boardSlice.reducer;
