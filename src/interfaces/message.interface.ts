import ITag from './tag.interface';
import IEntity from './entities.interface';
import IComment from './comment.interface';
import IUser from './user.interface';

export default interface Message {
    id: number;
    tags?: ITag[];
    author: IUser;
    lang?: string;
    likes?: number;
    content: string;
    createdAt: Date;
    updatedAt?: Date;

    /** Should contain additional message information, like:
     * - Image URLs
     * - Tags
     * - Code Snippets
     */
    entities?: IEntity;
    comments?: IComment[];
}
