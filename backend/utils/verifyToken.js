import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;
    const { authorization } = req.headers;
    console.log("authorization :: ", authorization, "- validateToken middleware");
    const token = authorization?.split(" ")[1];
    console.log("token", token)

    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log('USER', user)
        if (err) return next(errorHandler(403, 'Token is not valid!'));
        req.user = user;
        next();
    });
}