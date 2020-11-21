import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import {Redirect} from 'react-router-dom';

const apiUrl = "http://localhost:1234/api";
const userToken = localStorage.getItem("userToken");

axios.defaults.headers.common.Authorization = userToken; 

// Automatically sets the authorization header because of the request interceptor
axios.interceptors.request.use(req => {
  req.headers.authorization = userToken;
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
       return <Redirect to="/sign-in" />  
       
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

