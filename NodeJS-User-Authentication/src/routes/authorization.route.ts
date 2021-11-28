import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";
import { SigningOptions } from "crypto";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;    
        
        if (!user)
            throw new ForbiddenError('User not informed'); 

        const jwtPayload = { username: user.username };
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: 600 };
        const secretKey = String(process.env.MY_SECRET_KEY);

        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt });

    } catch (error) {
        next(error);
    }

});

authorizationRoute.post('/token/validade', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
}); 

export default authorizationRoute;