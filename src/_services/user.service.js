import { HttpMethodType } from 'src/_types';
import { apiService } from './api.service';

export const userService = {
    register
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