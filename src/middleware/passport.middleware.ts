import { Application } from 'express';
import passport from 'passport';
import PassportConfig from '../config/Passport/Passport.config';

import jwtStrategy from '../config/Passport/Strategies/Jwt.strategy';
import localStrategy from '../config/Passport/Strategies/Local.strategy';
import passportGitHubStrategy from '../config/Passport/Strategies/GitHub.strategy';

// No need to actually pass the instance of passport since it returns a singleton
const passportConfig = new PassportConfig([localStrategy, jwtStrategy, passportGitHubStrategy]);
const passportMiddleware = (app: Application): void => {
    app.use(passport.initialize());
};

export default passportMiddleware;
