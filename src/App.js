import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import 'react-notifications/lib/notifications.css';
import theme from 'src/theme';
import routes from 'src/routes';
import { authenticationService } from 'src/_services';

const App = () => {
  //authenticationService.currentUserValue
  var routing = useRoutes(routes({ name: 'Hello' }));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
