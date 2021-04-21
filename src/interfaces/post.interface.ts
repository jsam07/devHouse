import IMessage from './message.interface';
import ILocation from './location.interface';
import IUser from './user.interface';

export default interface Post extends IMessage {
    geo?: ILocation;
    title?: string;
    reposts?: Post[];
    parentPostId?: number;
    postsLikedFrom?: IUser[];
}
