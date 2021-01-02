import { useNavigate } from 'react-router-dom';
import ApiService from './ApiService.js';
import JwtService from "./JwtService.js";

const UserTokenKey = "UserToken";

export default class UserService {

    static getValidAccessToken() {
        var token = localStorage.getItem(UserTokenKey)

        if (!JwtService.verifyJwt(token)) {
            return null;
        }

        return token;
    }

    static setAccessToken(token) {
        if (!JwtService.verifyJwt(token)) {
            return false;
        }

        localStorage.setItem(UserTokenKey, token);

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