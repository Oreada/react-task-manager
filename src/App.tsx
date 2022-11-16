import { Provider } from 'react-redux';
import { store } from 'store/appStore';
import './App.scss';
import Router from './router/Router';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
