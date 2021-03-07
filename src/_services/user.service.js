import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    register,
    activateUser,
    forgetPassword,
    resetPassword,
    getUsers,
    getUserDetails,
    updateUserDetails,
    deleteUser,
    resetOwnPassword
};

async function register(
    fullName,
    email,
    password
) {
  const data = {
    fullName,
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

async function resetOwnPassword(password, newPassword) {

    return await apiService.asyncCallAuthorizedApi(HttpMethodType.POST, '/user/reset-own-password', { password, newPassword })
}
async function getUsers() {

  return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, '/user', {})
}

async function getUserDetails(id) {

  return await apiService.asyncCallAuthorizedApi(HttpMethodType.GET, `/user/${id}`, {})
}

async function updateUserDetails(id,fullName, email, userType, isActive, canLogin, password = null) {

  return await apiService.asyncCallAuthorizedApi(HttpMethodType.PUT, `/user/${id}`, {fullName,email,userType,isActive,canLogin, password})
}

async function deleteUser(id) {

  return await apiService.asyncCallAuthorizedApi(HttpMethodType.DELETE, `/user/${id}`, {})
}
