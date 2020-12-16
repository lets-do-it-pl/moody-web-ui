import React from 'react';
import jwt from "jsonwebtoken";

import ApiService from './api.service';

export default class UserService extends React.Component {

    static getValidAccessToken() {
        const userTokenKey = "UserToken";

        var token = localStorage.getItem(userTokenKey)

        if (token == null) {
            return null;
        }

        var decodedToken = jwt.decode(token, { complete: true });
        var dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()) {
            console.log("Token is expired!");
            return null;
        }

        return token;
    }

    static isAuthenticated() {
        return this.getValidAccessToken() != null;
    }

    authenticate = (email, password) => {
        var data = { Email: email, Password: password };
        var result = ApiService.callApi("/user/authentication", "post", data, true);

        alert(result);

    }
}