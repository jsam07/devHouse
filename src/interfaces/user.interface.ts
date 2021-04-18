import IPost from './post.interface';
import IPublicMetrics from './publicMetric.interface';

export default interface IUser {
    id?: string;
    url?: string;
    lastName?: string;
    firstName?: string;

    email: string;
    password?: string;
    type?: number;
    createdAt?: number;
    username?: string;
    private?: boolean;
    location?: string;
    verified?: boolean;
    description?: string;
    passwordSalt?: string;
    passwordHash?: string;
    profileImageURL?: string;

    posts?: IPost[];
    friends?: string[];
    followers?: string[];
    publicMetrics?: IPublicMetrics;
}
