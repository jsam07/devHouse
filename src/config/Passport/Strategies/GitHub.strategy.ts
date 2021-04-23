import { Strategy as GitHubStrategy } from 'passport-github2';

import { logger } from '../../../utils/logger';
import UserService from '../../../services/User.service';
import { User } from '../../../interfaces/prisma.models';
import PassportStrategy from '../../../interfaces/passport.strategy.interface';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/github/callback',
        passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
        // TODO: Fix this to call appropriate controller
        logger.debug('Got into verify function');
        const user: User = await UserService.createGitHubUser(profile.email);
        return user
            ? done(null, user)
            : done(null, false, {
                  message: 'Your login details are not valid. Please try again',
              });
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
