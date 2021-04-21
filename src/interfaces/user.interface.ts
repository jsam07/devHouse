import IPost from './post.interface';
import IPublicMetrics from './publicMetric.interface';

export default interface IUser {
    id?: string;
    userName?: string;
    imageUrl?: string;
    lastName?: string;
    firstName?: string;

    email: string;
    password?: string;
    createdAt?: number;

    private?: boolean;
    provider?: number;
    location?: string;
    verified?: boolean;
    description?: string;
    hashedPassword?: string;

    posts?: IPost[];
    friends?: string[];
    followers?: string[];
    publicMetrics?: IPublicMetrics;
}
