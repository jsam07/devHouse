import IPost from './post.interface_';
import IPublicMetrics from './publicMetric.interface_';

export default interface IUser {
    id: string;
    url?: string;
    lastName: string;
    firstName: string;

    email: string;
    createdAt: number;
    username: string;
    private: boolean;
    location?: string;
    verified: boolean;
    description?: string;
    passwordSalt: string;
    passwordHash: string;
    profileImageURL?: string;

    posts?: IPost[];
    friends?: string[];
    followers?: string[];
    publicMetrics?: IPublicMetrics;
}
