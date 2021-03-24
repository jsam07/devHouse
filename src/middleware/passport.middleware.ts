import passport from 'passport';
import { Application } from 'express';

const passportMiddleware = (app: Application): void => {
    app.use(passport.initialize());
};

export default passportMiddleware;
