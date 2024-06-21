export interface Author {
    username: string;
    id: string;
}

export interface Comments {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
}
export interface BookmarkPost {
    userId: string;
  }
export interface PostType {
    id: string;
    title: string;
    content: string;
    category: string[];
    createdAt: Date;
    updatedAt: Date;
    author: Author;
    comments: Comments[];
    bookmarks: BookmarkPost[],
    votes: [];
}
