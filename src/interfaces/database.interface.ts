import IPost from './post.interface';
import IUser from './user.interface';
import IComment from './comment.interface';

export default interface Database {
    users: IUser[];
    posts: IPost[];
    comments: IComment[];
}
