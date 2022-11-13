import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import AboutPage from '../pages/AboutPage';
import Authentification from '../pages/AuthPage';
import NoFoundPage from '../pages/NoFoundPage';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="form" element={<Authentification />} />
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
