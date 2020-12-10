import React from 'react';
import jwt from "jsonwebtoken";

class UserProcess extends React.Component {

    static getToken() {
        const userTokenKey = "UserToken";

        return localStorage.getItem(userTokenKey)
    }

    static isTokenValid() {
        var token = this.getToken();

        if (token == null) {
            return false;
        }

        var decodedToken = jwt.decode(token, { complete: true });
        var dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()) {
            console.log("Token is expired!");
            return false;
        }

        return true;
    }
}

export default UserProcess