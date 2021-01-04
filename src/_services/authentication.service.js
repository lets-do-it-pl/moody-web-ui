import { BehaviorSubject } from 'rxjs';

import { handleResponse } from 'src/_helpers';

const apiUrl = process.env.REACT_APP_API_URL;
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
    };

    return fetch(`${apiUrl}/user/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {

            if (user.isSuccess !== true) {
                return user;
            }

            if (!user || Object.keys(user).length === 0) {
                return {
                    isSuccess: false,
                    message: "Token info hasn't received!"
                };
            }

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            currentUserSubject.next(user.data);

            return true;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}