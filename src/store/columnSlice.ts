import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnStateKeys, INITIAL_COLUMN_STATE, SLICE_NAMES } from './constants';
import { ColumnStateType } from './model';

const columnSlice = createSlice({
  name: SLICE_NAMES.column,
  initialState: INITIAL_COLUMN_STATE,
  reducers: {
    setTasks(state, action: PayloadAction<Pick<ColumnStateType, ColumnStateKeys.tasks>>) {
      state.tasks = action.payload.tasks;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { setTasks } = columnSlice.actions;

export default columnSlice.reducer;
