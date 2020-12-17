import React from 'react';
import jwt from "jsonwebtoken";
import { useNavigate } from 'react-router-dom';
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

    static setAccessToken(token) {
        const userTokenKey = "UserToken";

        var decodedToken = jwt.decode(token, { complete: true });
        var dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()) {
            console.log("Token is expired!");
            return null;
        }

        localStorage.setItem(userTokenKey, token);

        return true;

    }

    static isAuthenticated() {
        return this.getValidAccessToken() != null;
    }

    static authenticate(email, password) {
        var data = { 'email': email, 'password': password };

        ApiService.callApi("user/authenticate", "post", data, true)
            .then(response => {
                var result = this.setAccessToken(response);

                if (result !== true) {
                    return;
                }

                const navigate = useNavigate();

                navigate('/app/Dashboard', { replace: true });
            })


    }
}