import ITag from './tag.interface_';
import IEntity from './entities.interface_';
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
