import { handleResponse } from 'src/_helpers';

const apiUrl = process.env.REACT_APP_API_URL;

export const userService = {
    register
};

function register(
    name,
    surname,
    email,
    password
) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: email,
            password: password,
            name,
            surname,
            email
        })
    };

    return fetch(`${apiUrl}/user`, requestOptions)
        .then(handleResponse)
        .then(() => {
            return true;
        });
}