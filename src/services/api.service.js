import axios from 'axios';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Navigate } from 'react-router-dom';

import UserService from './user.service';

const apiUrl = process.env.REACT_APP_SOURCE_URL;

class ApiService extends React.Component {

  callApi = (url, httpMethodType, data, isAnonymous = false) => {

    let config = {
      headers: {}
    };

    if (!isAnonymous) {
      var accessToken = UserService.getAccessToken();
      if (accessToken == null) {
        NotificationManager.warning('Unauthorized!', 'You are redirected to Sign In Page');
        return <Navigate to="/sign-in" />
      }

      config.headers = { Authorization: `Bearer ${accessToken}` };
    }

    axios({
      method: httpMethodType,
      url: `${apiUrl}/${url}`,
      data: data,
      headers: config.headers
    })
      .then(function (response) {
        // handle success
        console.log(response.data);

        return response.data;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error.response);
          NotificationManager.error('Error!', 'Unauthorized user');
          // eslint-disable-next-line react/react-in-jsx-scope
          return <Navigate to="/sign-in" />

        }
        else if (error.response) {
          console.log(error.response);
          NotificationManager.error("Error!", error.response.status);

        }
        else {
          console.log('Error', error.message);
          NotificationManager.error(error.response.headers, error.response.status);

        }
        console.log(error.config);
      });
  }
}

export default ApiService