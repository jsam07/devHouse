import { Strategy as JwtStrategy } from 'passport-jwt';

import PassportStrategy from '../../../interfaces/passport.strategy.interface';
import UserService from '../../../services/User.service';

import User from '../../../interfaces/user.interface';
import { logger } from '../../../utils/logger';

const cookieJwtExtractor = req => {
    let token = null;
    if (req && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    return token;
};

const jwtStrategy: JwtStrategy = new JwtStrategy(
    {
        secretOrKey: 'JWT_SECRET',
        jwtFromRequest: cookieJwtExtractor,
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            logger.debug('Inside jwt verification');
            logger.debug(`Cookie expiration: `);
            const userService = new UserService();
            // TODO: Check for password
            const user: User = await userService.findUserByEmail(payload.email);

            if (user) {
                logger.debug('Attaching user to req object from jwt');
                req.user = {
                    email: payload.email,
                };
                logger.debug(`From jwt, checking req.user = ${req.user}`);
                return done(undefined, user, payload);
            }

            return done(undefined, false, { message: 'User not found' });
        } catch (error) {
            return done(undefined, false, { message: error.message || 'Error occurred in jwt strategy' });
        }
    },
);

const passportJwtStrategy: PassportStrategy = {
    name: 'jwt',
    strategy: jwtStrategy,
};

export default passportJwtStrategy;
