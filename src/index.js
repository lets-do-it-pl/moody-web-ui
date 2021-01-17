import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render((
  <BrowserRouter>
    <Provider store = {store}>
      <App />
      </Provider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
