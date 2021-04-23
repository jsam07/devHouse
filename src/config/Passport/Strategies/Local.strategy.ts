import { Strategy as LocalStrategy } from 'passport-local';

import UserService from '../../../services/User.service';
import AuthenticationService from '../../../services/Auth.service';
import DoneFunction from '../../../interfaces/done.function.interface';
import RequestWithUser from '../../../interfaces/requestWithUser.interface';
import UserNotFoundException from '../../../exceptions/UserNotFoundException';
import PassportStrategy from '../../../interfaces/passport.strategy.interface';
import IncorrectCredentialsException from '../../../exceptions/IncorrectCredentialsException';

const localStrategy: LocalStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req: RequestWithUser, email: string, password: string, done: DoneFunction): Promise<void> => {
        try {
            const user = await UserService.findUserByEmail(email);

            if (!user) {
                return done(new UserNotFoundException(email));
            }

            const isPasswordValid = await AuthenticationService.isPasswordValid(user, password);

            if (!isPasswordValid) {
                return done(new IncorrectCredentialsException());
            }

            req.user = { email: user.email };

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
