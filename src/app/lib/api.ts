export interface REPLY {
 id: number;
 content: string;
 score: number;
 createdAt: Date;
 updatedAt: Date;
 commentId: number | null;
 userId: number | null;
}

export interface Comment {
 id: number;
 content: string;
 score: number;
 createdAt: Date;
 updatedAt: Date;
 userId: number | null;
 replies: REPLY[];
}
