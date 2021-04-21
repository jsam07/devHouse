/**
 * Model Post
 */

export type Post = {
    id: number;
    title: string | null;
    content: string | null;
    authorId: number;
    parentPostId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
};

/**
 * Model User
 */

export type User = {
    id: number;
    email: string;
    provider: number;
    imageUrl: string | null;
    userName: string | null;
    lastName: string | null;
    firstName: string | null;
    hashedPassword: string | null;
};

/**
 * Model Comment
 */

export type Comment = {
    id: number;
    content: string;
    authorId: number;
    postId: number;
    parentCommentId: number | null;
    createdAt: Date;
    updatedAt: Date | null;
};

/**
 * Model HashTag
 */

export type HashTag = {
    id: number;
    name: string;
};
