import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";

async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization'];

        if(!authorizationHeader) 
            throw new ForbiddenError('No credentials or auth');

        const [ authenticationType, token ] = authorizationHeader.split(' ');

        if(authenticationType !== 'Bearer'  || !token)
            throw new ForbiddenError('Invalid auth');

        try {
            const tokenPayload = JWT.verify(token, String(process.env.MY_SECRET_KEY));

            if (typeof tokenPayload !== 'object' || !tokenPayload.sub)
                throw new ForbiddenError('Invalid token');

            const user = { uuid: tokenPayload.sub, username: tokenPayload.username };

            req.user = user;

            next();
        } catch (error) {
            throw new ForbiddenError('Invalid token');
        }
    } catch (error) {
        next(error);
    }
}

export default jwtAuthenticationMiddleware;