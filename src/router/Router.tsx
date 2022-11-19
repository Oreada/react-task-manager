import Board from 'components/Board/Board';
import RequireAuth from 'components/RequireAuth/RequireAuth';
import AuthPage from 'pages/AuthPage';
import BoardList from 'pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import NoFoundPage from '../pages/NoFoundPage/NoFoundPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { ANYTHING_PATH, AUTHENTICATION_PATH, BOARDS_ID_PATH, BOARDS_PATH, ROOT_PATH } from './constants';

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
        path={AUTHENTICATION_PATH}
        element={
          <RequireAuth>
            <AuthPage />
          </RequireAuth>
        }
      />
      <Route path={ANYTHING_PATH} element={<NoFoundPage />} />
    </Route>
  </Routes>
);

export default Router;
