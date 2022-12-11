import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import boardReducer from './boardSlice';
import mainReducer from './mainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    board: boardReducer,
    auth: authReducer,
  },
});
