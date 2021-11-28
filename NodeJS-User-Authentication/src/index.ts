require('dotenv').config();

import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt.authentication.middleware';
import errorHandler from './middlewares/error.handle.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRouter from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

// Application Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes Config
app.use(statusRouter);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Error Handler 
app.use(errorHandler);

// Server Starter
app.listen(3000, () => {
    console.log('Server start success');
});
