import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const apiUrl = "http://localhost:1234/api";

const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken; 

// Automatically sets the authorization header because of the request interceptor
axios.interceptors.request.use(req => {
  req.headers.authorization = apiToken;
  return req;
});

/*
axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);

*/
const getUsers = () => axios.get(`${apiUrl}/users`);
const getUserId = () => 1;
const getUserDetails = () => axios.get(`${apiUrl}/${getUserId()}/details`);


axios.all([getUserDetails, getUserId])
.then(
  axios.spread((...responses) => {
    const responseGetUserDetails = responses[0];
    const responseGetUserId = responses[1];

    console.log(responseGetUserDetails, responseGetUserId );
  })
)
.catch((error) => {
  // Error
  if (error.response) {
      // status code - out of the range of 2xx 
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
       NotificationManager.error('Error while getting user details!', 'Error!');

  } else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the 
      // browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
      NotificationManager.error('Error while getting the request!', 'Error!');

  } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      NotificationManager.error('Error', 'Error!');

  }
  console.log(error.config);
});


export default {
  getUserId,
  getUsers,
  getUserDetails
};

