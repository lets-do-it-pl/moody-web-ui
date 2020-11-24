/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-template-curly-in-string */
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

function parseJwt(token, claimName) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)[claimName];
};

var idUser = parseJwt(userToken,"userId");

function GetUsers() {
  var url = '${apiUrl}/users';
  return CallGetApiByAxios(url, 'get');
}

function GetUserDetails() {
  var url = '${apiUrl}/{id}/details';
  return CallGetApiByAxios(url, 'get');
}

function CallApiByAxios(Url, Data, httpMethodType){

  axios({
    method: httpMethodType,
    url: Url,
    data: Data
  })
  .then(function (response) {
    // handle success
    console.log(response);
  })
.catch((error) => {
  if (error.response.status === 401) {
      console.log(error.response);
       NotificationManager.error('Error!', 'Unauthorized user');
       // eslint-disable-next-line react/react-in-jsx-scope
       return <Redirect to="/sign-in" />  
       
  } else if (error.response) {
    console.log(error.response);
    NotificationManager.error("Error!", error.response.status);
   }else {
      
      console.log('Error', error.message);
      NotificationManager.error(error.response.headers, error.response.status);

  }
  console.log(error.config);
  });
  
}

export default {
  GetUsers,
  GetUserDetails 
};

