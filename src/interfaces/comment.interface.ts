import IMessage from './message.interface';
import IUser from './user.interface';
import Post from './post.interface';

export default interface Comment extends IMessage {
    post?: Post;
    likesFrom?: IUser[];
    parentComment?: Comment;
}
