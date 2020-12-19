import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import 'react-notifications/lib/notifications.css';
import theme from './theme';
import routes from './routes';
import UserService from './services/user.service'

const App = () => {

  const isAuthenticated = () => UserService.isAuthenticated();

  const routing = useRoutes(routes(isAuthenticated()));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;