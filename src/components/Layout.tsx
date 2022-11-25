import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Layout = () => (
  <div className="container">
    <Header />
    <main className="main">
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </main>
    <Footer />
  </div>
);

export default Layout;
