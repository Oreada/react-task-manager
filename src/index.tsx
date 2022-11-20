import { ThemeProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { theme } from 'styles/theme';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter basename="/project-management-app">
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
