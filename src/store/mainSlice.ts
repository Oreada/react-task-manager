import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard } from 'api/boards/createBoard';
import { deleteBoard } from 'api/boards/deleteBoard';
import { getAllBoards } from 'api/boards/getAllBoards';
import { updateBoard } from 'api/boards/updateBoard';
import { deleteColumn } from 'api/columns/deleteColumn';
import { Board, ColumnType } from 'types/types';
import { INITIAL_MAIN_STATE, ReducerNameActionTypes } from './constants';
import { SLICE_NAMES } from './constants';
import {
  CreateBoardArgsType,
  DeleteBoardArgsType,
  EditBoardArgsType,
  GetBoardArgsType,
} from './model';

export const getBoardsThunk = createAsyncThunk<Board[], GetBoardArgsType>(
  ReducerNameActionTypes.getBoards,
  async ({ token }: GetBoardArgsType) => {
    return await getAllBoards(token);
  }
);

export const createBoardThunk = createAsyncThunk<Board, CreateBoardArgsType>(
  ReducerNameActionTypes.createBoard,
  async ({ token, body }: CreateBoardArgsType) => {
    return await createBoard(token, body);
  }
);

export const deleteBoardThunk = createAsyncThunk<Board, DeleteBoardArgsType>(
  ReducerNameActionTypes.deleteBoard,
  async ({ token, idBoard }: DeleteBoardArgsType) => {
    return await deleteBoard(token, idBoard);
  }
);

export const editBoardThunk = createAsyncThunk<Board, EditBoardArgsType>(
  ReducerNameActionTypes.editBoard,
  async ({ token, idBoard, body }: EditBoardArgsType) => {
    return await updateBoard(token, idBoard, body);
  }
);

const mainSlice = createSlice({
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
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.filter((board) => board._id !== action.payload._id);
      })
      .addCase(editBoardThunk.fulfilled, (state, action) => {
        state.boards = state.boards.map((board) => {
          if (board._id === action.payload._id) {
            return {
              ...action.payload,
            };
          }
          return board;
        });
      });
  },
});

export default mainSlice.reducer;
