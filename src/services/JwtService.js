import jwt from "jsonwebtoken";

const secretKey = process.env.REACT_APP_JWT_SECRET_KEY;

export default class JwtService {
    static verifyJwt(token) {

        try {
            var decoded = jwt.verify(
                token,
                secretKey,
                { algorithms: ['A256CBC-HS512'] });

            return decoded !== undefined;

        } catch (err) {
            console.log(err);
            return false;
        }
    }
}