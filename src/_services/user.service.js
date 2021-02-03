import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    register,
    activateUser,
    forgetPassword,
    resetPassword,
    getUsers
};

async function register(
    name,
    surname,
    email,
    password
) {
  const data = {
    fullName: `${name} ${surname}`,
    email,
    password
  };

  return await apiService.asyncCallApi(HttpMethodType.POST, '/user', data)
}

async function activateUser(token) {

    return await apiService.asyncCallApi(HttpMethodType.POST, '/user/activate', {}, token)
}

async function forgetPassword(email) {

    return await apiService.asyncCallApi(HttpMethodType.POST, '/user/forget-password', { email })
}

async function resetPassword(token, password) {

    return await apiService.asyncCallApi(HttpMethodType.POST, '/user/reset-password', { password }, token)
}

async function getUsers() {

  return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, '/user', {})
}
