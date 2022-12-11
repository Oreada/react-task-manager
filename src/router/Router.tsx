import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const Layout = lazy(() => import('../components/Layout'));
const Board = lazy(() => import('components/Board/Board'));
const EditProfile = lazy(() => import('components/EditProfile/EditProfile'));
const RequireAuth = lazy(() => import('components/RequireAuth/RequireAuth'));
const AuthPage = lazy(() => import('pages/AuthPage'));
const BoardList = lazy(() => import('pages/MainPage/MainPage'));
const SearchPage = lazy(() => import('pages/SearchPage/SearchPage'));
const NoFoundPage = lazy(() => import('../pages/NoFoundPage/NoFoundPage'));
const WelcomePage = lazy(() => import('../pages/WelcomePage/WelcomePage'));

import {
  ANYTHING_PATH,
  AUTHENTICATION_PATH,
  BOARDS_ID_PATH,
  BOARDS_PATH,
  EDIT_PATH,
  ROOT_PATH,
  SEARCH_PATH,
} from './constants';

const Router = () => (
  <Routes>
    <Route path={ROOT_PATH} element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route
        path={BOARDS_PATH}
        element={
          <RequireAuth>
            <BoardList />
          </RequireAuth>
        }
      />
      <Route
        path={BOARDS_ID_PATH}
        element={
          <RequireAuth>
            <Board />
          </RequireAuth>
        }
      />
      <Route
        path={EDIT_PATH}
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
      <Route
        path={AUTHENTICATION_PATH}
        element={
          <RequireAuth>
            <AuthPage />
          </RequireAuth>
        }
      />
      <Route
        path={SEARCH_PATH}
        element={
          <RequireAuth>
            <SearchPage />
          </RequireAuth>
        }
      />
      <Route path={ANYTHING_PATH} element={<NoFoundPage />} />
    </Route>
  </Routes>
);

export default Router;
