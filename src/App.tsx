import { TestApiFunctions } from 'api/TestApiFunctions';
import { Provider } from 'react-redux';
import './App.scss';
import Router from './router/Router';
import { store } from 'store/appStore';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      {/* <TestApiFunctions /> */}
    </Provider>
  );
};

export default App;
