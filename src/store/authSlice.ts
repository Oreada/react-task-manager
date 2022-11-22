import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from 'api/users/getUser';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { readFromLocal } from 'helpers';
import { INITIAL_AUTH_STATE, ReducerNameActionTypes, SLICE_NAMES } from './constants';
import { AuthReducer, GetUserNameArgsType } from './model';

const stateFromLocal: AuthReducer | null = readFromLocal(LOCAL_STORAGE_KEY);

export const initialAuth: AuthReducer = stateFromLocal ? stateFromLocal : INITIAL_AUTH_STATE;

export const getUserName = createAsyncThunk<string | null, GetUserNameArgsType>(
  ReducerNameActionTypes.getUserName,
  async ({ token, idUser }: GetUserNameArgsType) => {
    if (token && idUser) {
      const { name } = await getUser(token, idUser);
      return name;
    }
    return '';
  }
);
export const authSlice = createSlice({
  name: SLICE_NAMES.auth,
  initialState: initialAuth,
  reducers: {
    setId(state, action: PayloadAction<Omit<AuthReducer, 'name'>>) {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserName.fulfilled, (state, action) => {
      state.name = action.payload;
    });
  },
});

export default authSlice.reducer;
// export const { setId } = authSlice.actions;
