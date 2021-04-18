import { Strategy as JwtStrategy } from 'passport-jwt';

import PassportStrategy from '../../../interfaces/passport.strategy.interface';
import UserService from '../../../services/User.service';

import User from '../../../interfaces/user.interface';

const cookieJwtExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

const jwtStrategy: JwtStrategy = new JwtStrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: cookieJwtExtractor,
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            const userService = new UserService();
            const user: User = await userService.findUserByID(payload.email);

            if (user) {
                return done(undefined, user, payload);
            }

            req.user = {
                email: payload.email,
            };
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
