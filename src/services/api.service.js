import axios from 'axios';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Navigate } from 'react-router-dom';

import UserService from './user.service';

const apiUrl = process.env.REACT_APP_API_URL;

class ApiService extends React.Component {

  static callApi = (url, httpMethodType, data, isAnonymous = false) => {

    let config = {
      headers: {}
    };

    if (!isAnonymous) {
      var accessToken = UserService.getAccessToken();
      if (accessToken == null) {
        NotificationManager.warning('Unauthorized!', 'You are redirected to Sign In Page');
        return <Navigate to="/login" />
      }

      config.headers = { Authorization: `Bearer ${accessToken}` };
    }

    return axios({
      method: httpMethodType,
      baseURL: apiUrl,
      url: `${url}`,
      data: data,
      headers: config.headers
    })
      .then(function (response) {
        // handle success
        console.log(response.data);

        return response.data;
      })
      .catch((error) => {
        if (error.response === undefined) {
          // console.log(error);
          NotificationManager.error('Error!', 'Unexpected Exception!');

        }
        else if (error.response.status !== undefined && error.response.status === 401) {
          console.log(error.response);
          NotificationManager.error('Error!', 'Unauthorized user');

          return <Navigate to="/login" />

        }
        else if (error.response) {
          console.log(error.response);
          NotificationManager.error("Error!", error.response);

        }
        else {
          console.log('Error', error);
          NotificationManager.error(error.response.headers, error.response);

        }
        console.log(error.config);
      });
  }
}

export default ApiService