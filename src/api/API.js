import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const apiUrl = "http://localhost:1234/api";

const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken; 

// Automatically sets the authorization header because of the request interceptor
axios.interceptors.request.use(req => {
  req.headers.authorization = apiToken;
  return req;
});

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
      
       console.log(error.response.data);
       console.log(error.response.status);
       console.log(error.response.headers);
       NotificationManager.error('Unauthorized user.', 'Error!');
       // eslint-disable-next-line react/react-in-jsx-scope
       return <Redirect to="/" />  // redirection route should be define -- root for sign in page
       
  } else {
      
      console.log('Error', error.message);
      NotificationManager.error(error.response.data, error.response.status);

  }
  console.log(error.config);
});


export default {
  getUserId,
  getUsers,
  getUserDetails
};

