import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../../interfaces/user.interface';
import UserService from '../../../services/User.service';
import PassportStrategy from '../../../interfaces/passport.strategy.interface';
import { logger } from '../../../utils/logger';

const userService = new UserService();
const localStrategy: LocalStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            logger.debug('Got into local strategy try block');
            const user: User = await userService.findUserByEmail(email);
            logger.debug('Got USER');

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await UserService.isValidPassword(user, password);

            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            logger.debug('Returning USER');
            req.user = {
                email: user.email,
            };
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    },
);

const passportLocalStrategy: PassportStrategy = {
    name: 'local',
    strategy: localStrategy,
};

export default passportLocalStrategy;
