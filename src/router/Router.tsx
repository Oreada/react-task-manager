import Board from 'components/Board/Board';
import AuthPage from 'pages/AuthPage';
import BoardList from 'pages/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import NoFoundPage from '../pages/NoFoundPage/NoFoundPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

const Router = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<WelcomePage />} />
      <Route path="boards" element={<BoardList />} />
      <Route path="boards/:id" element={<Board />} />
      <Route path="form" element={<AuthPage />} />
      <Route path="*" element={<NoFoundPage />} />
    </Route>
  </Routes>
);

export default Router;
