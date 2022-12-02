import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser } from 'api/users/getUser';
import { LOCAL_STORAGE_KEY } from '../constants/constants';
import { checkLifeTimeToken, readFromLocal, removeLocal } from 'helpers';
import { UserInfo } from 'types/types';
import { INITIAL_AUTH_STATE, ReducerNameActionTypes, SLICE_NAMES } from './constants';
import { AuthReducer, GetUserNameArgsType } from './model';

const getInitialFromLocal = (): AuthReducer => {
  const stateFromLocal: AuthReducer | null = readFromLocal(LOCAL_STORAGE_KEY);
  const dateCreatedToken = stateFromLocal?.date;
  if (dateCreatedToken) {
    const isTokenLive = checkLifeTimeToken(dateCreatedToken);
    if (isTokenLive) {
      return stateFromLocal;
    }
    removeLocal(LOCAL_STORAGE_KEY);
  }
  return INITIAL_AUTH_STATE;
};

export const initialAuth: AuthReducer = getInitialFromLocal();

export const getUserData = createAsyncThunk<UserInfo | null, GetUserNameArgsType>(
  ReducerNameActionTypes.getUserName,
  async ({ token, idUser }: GetUserNameArgsType) => {
    if (token && idUser) {
      const userData = await getUser(token, idUser);
      return userData;
    }
    return null;
  }
);

export const authSlice = createSlice({
  name: SLICE_NAMES.auth,
  initialState: initialAuth,
  reducers: {
    setId(state, action: PayloadAction<Omit<AuthReducer, 'user'>>) {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.token = action.payload.token;
      state.date = action.payload.date;
    },
    setUserData(state, action: PayloadAction<Pick<AuthReducer, 'user'>>) {
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
// export const { setId } = authSlice.actions;
