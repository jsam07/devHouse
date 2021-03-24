import IPost from './post.interface_';
import IUser from './user.interface_';
import IComment from './comment.interface';

export default interface Database {
    users: IUser[];
    posts: IPost[];
    comments: IComment[];
}
