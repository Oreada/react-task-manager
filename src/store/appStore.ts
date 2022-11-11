import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import mainReducer from './mainSlice';
import columnReducer from './columnSlice';

export const store = configureStore({
  reducer: {
    main: mainReducer,
    board: boardReducer,
    column: columnReducer,
  },
});
