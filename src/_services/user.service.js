import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    register,
    activateUser,
    forgetPassword,
    resetPassword
};

async function register(
    name,
    surname,
    email,
    password
) {
    var data = {
        username: email,
        password: password,
        name,
        surname,
        email
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