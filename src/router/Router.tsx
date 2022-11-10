import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import AboutPage from '../pages/AboutPage';
import Authentication from '../pages/AuthPage';
import NoFoundPage from '../pages/NoFoundPage';
import WelcomePage from '../pages/WelcomePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="form" element={<Authentication />} />
        <Route path="*" element={<NoFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
