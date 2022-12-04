import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Loader from './Loader/Loader';

const Layout = () => (
  <div className="container">
    <Suspense fallback={<Loader />}>
      <Header />
      <main className="main">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
    </Suspense>
  </div>
);

export default Layout;
