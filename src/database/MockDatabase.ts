import Post from '../interfaces/post.interface';
import User from '../interfaces/user.interface';
import Comment from '../interfaces/comment.interface';

export default interface MockDatabase {
    users: User[];
    posts: Post[];
    comments: Comment[];
}
