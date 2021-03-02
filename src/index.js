import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import App from './App';

const reCaptchaKeyValue = process.env.REACT_APP_RECAPTCHA_KEY;

ReactDOM.render((
  <GoogleReCaptchaProvider
    reCaptchaKey={reCaptchaKeyValue}
    useRecaptchaNet="true"
    scriptProps={{
      async: true, // optional, default to false,      
    }}
  >
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </GoogleReCaptchaProvider >
), document.getElementById('root'));

serviceWorker.unregister();