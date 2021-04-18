import { Application } from 'express';
import passport from 'passport';
import PassportConfig from '../config/Passport/Passport.config';
import localStrategy from '../config/Passport/Strategies/Local.strategy';
import jwtStrategy from '../config/Passport/Strategies/Jwt.strategy';

const passportConfig = new PassportConfig([localStrategy, jwtStrategy]);
const passportMiddleware = (app: Application): void => {
    app.use(passport.initialize());
};

export default passportMiddleware;
