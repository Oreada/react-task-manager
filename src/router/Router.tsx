import Board from 'components/Board/Board';
import BoardList from 'pages/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Authentification from '../pages/AuthPage';
import NoFoundPage from '../pages/NoFoundPage';
import WelcomePage from '../pages/WelcomePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="boards" element={<BoardList />} />
        <Route path="boards/:id" element={<Board />} />
        <Route path="form" element={<Authentification />} />
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
