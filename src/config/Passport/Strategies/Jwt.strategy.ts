import { Strategy as JwtStrategy } from 'passport-jwt';

import { logger } from '../../../utils/logger';
import { JWT_SECRET } from '../../../utils/secrets';
import UserService from '../../../services/User.service';
import PassportStrategy from '../../../interfaces/passport.strategy.interface';

const cookieJwtExtractor = req => {
    let token = null;
    if (req && req.cookies && req.cookies.token) {
        if (req.cookies.token !== '') token = req.cookies.token;
    }
    return token;
};

const jwtStrategy: JwtStrategy = new JwtStrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: cookieJwtExtractor,
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            logger.debug('Inside jwt verification');
            logger.debug(`Cookie expiration: `);

            const user = await UserService.findUserByEmail(payload.email);

            if (user) {
                req.user = { email: payload.email };
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
