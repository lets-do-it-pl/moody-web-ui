import React from 'react';
import ReactDOM from 'react-dom';
//import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

//const reCaptchaKeyValue = process.env.REACT_APP_RECAPTCHA_KEY;

ReactDOM.render((
  // <GoogleReCaptchaProvider
  //   reCaptchaKey={reCaptchaKeyValue}
  //   useRecaptchaNet="true"
  //   scriptProps={{
  //     async: true, // optional, default to false,      
  //   }}
  // >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  //</GoogleReCaptchaProvider >
), document.getElementById('root'));

serviceWorker.unregister();
