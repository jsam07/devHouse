import ITag from './tag.interface';
import IEntity from './entities.interface';
import IComment from './comment.interface';

export default interface Message {
    id: string;
    tags?: ITag[];
    lang?: string;
    likes?: number;
    message: string;
    createdAt: number;
    authorID: string;
    /** Should contain additional message information, like:
     * - Image URLs
     * - Tags
     * - Code Snippets
     */
    entities?: IEntity;
    userLikes?: string[];
    comments?: IComment[];
}
