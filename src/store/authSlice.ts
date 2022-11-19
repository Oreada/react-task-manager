import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { readFromLocal } from 'helpers';
import { SLICE_NAMES } from './constants';
import { AuthReducer } from './model';

const stateFromLocal: AuthReducer | null = readFromLocal(LOCAL_STORAGE_KEY);
export const INITIAL_AUTH_STATE: AuthReducer = stateFromLocal
  ? stateFromLocal
  : { id: null, login: null, token: null };

export const authSlice = createSlice({
  name: SLICE_NAMES.auth,
  initialState: INITIAL_AUTH_STATE,
  reducers: {
    setId(state, action: PayloadAction<AuthReducer>) {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
  },
});

export default authSlice.reducer;
// export const { setId } = authSlice.actions;
