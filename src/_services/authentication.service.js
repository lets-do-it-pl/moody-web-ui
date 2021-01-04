import { BehaviorSubject } from 'rxjs';

import { apiService } from 'src/_services';
import { HttpMethodType, StatusType } from 'src/_types';

const tokenKeyInStorage = 'currentUser';
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(tokenKeyInStorage)));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

async function login(username, password) {

    var data = { email: username, password };

    var response = await apiService.asyncCallApi(HttpMethodType.POST, '/user/authenticate', data);

    if (response.status === StatusType.Success) {
        if (!response.data || Object.keys(response.data).length === 0) {
            return {
                status: StatusType.Fail,
                message: "Token info hasn't received!"
            };
        }

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(tokenKeyInStorage, JSON.stringify(response.data));
        currentUserSubject.next(response.data);

        return { status: StatusType.Success };
    }

    return response;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(tokenKeyInStorage);
    currentUserSubject.next(null);
}