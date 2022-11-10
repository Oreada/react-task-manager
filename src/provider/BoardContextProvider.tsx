// import { createContext, useMemo, useReducer } from 'react';
// import { AppActionType, INITIAL_BOARD_CONTEXT } from './constants';
// import { BoardActionType, BoardContextProps, BoardContextType, BoardStateType } from './model';

// export const BoardContext = createContext<BoardContextType>(INITIAL_BOARD_CONTEXT);

// const BoardContextProvider = ({ children }: BoardContextProps) => {
//   const reducer = (state: BoardStateType, action: BoardActionType): BoardStateType => {
//     const {
//       type,
//       payload: {},
//     } = action;

//     switch (type) {
//       case AppActionType.searchPhotos:
//         return {
//           ...state,
//         };
//       default:
//         return state;
//     }
//   };
//   return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>;

// };

// export default BoardContextProvider;
