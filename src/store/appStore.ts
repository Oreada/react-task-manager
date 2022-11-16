import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import mainReducer from './mainSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    board: boardReducer,
  },
});
