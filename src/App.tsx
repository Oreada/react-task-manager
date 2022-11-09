import { TestApiFunctions } from 'api/TestApiFunctions';
import './App.scss';
import Router from './router/Router';

const App = () => {
  return (
    <div>
      <Router />
      <TestApiFunctions />
    </div>
  );
};

export default App;
