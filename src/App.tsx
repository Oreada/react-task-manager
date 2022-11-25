// import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from 'store/appStore';
import './App.scss';
import Router from './router/Router';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
