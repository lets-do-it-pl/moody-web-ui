import axios from 'axios';

const apiUrl = "http://localhost:1234/api/apiToken";

const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiamFuMTIzIiwiVXNlcklkIjoiMSIsImV4cCI6MTkyMDI5MzcxNCwiaXNzIjoiQSIsImF1ZCI6IkIifQ.7IR6pXXjGJ64lHk5qLGL_utQEWsZQBpEGF_leGw3reA';

axios.defaults.headers.common.Authorization = apiToken; 

const getUserId = () => 1;
const getUsers = () => axios.get(`${apiUrl}/users`);
const getUserDetails = () => axios.get(`${apiUrl}/${getUserId()}/details`);

export default {
  getUserId,
  getUsers,
  getUserDetails
};

//  const res = await Promise.all([Api.getUsers(), Api.getUserDetails()]);