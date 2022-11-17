import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = () => (
  <div className="container">
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
