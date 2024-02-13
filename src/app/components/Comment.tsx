"use client";
import React, { useState } from "react";
import { Comment as CommentType } from "../lib/api";
import CommentBox from "./CommentBox";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { deleteComment, deleteReply } from "../actions";

type User = {
 id: number;
 email: string;
 name: string | null;
 image: string | null;
 emailVerified: Date | null;
};

type CommentProps = {
 comments: CommentType[];
 users: User[];
 userData: User | null;
};

export default function Comment({ comments, users, userData }: CommentProps) {
 if (!comments || comments.length === 0) {
  return null;
 }

 const handleCommentDelete = async (
  id: number,
  e: React.MouseEvent,
  isReply?: boolean
 ) => {
  e.stopPropagation();

  if (isReply) {
   await deleteReply(id);
  } else {
   await deleteComment(id);
  }
 };

 const handleEditComment = async (
  id: number,
  e: React.FocusEvent,
  content: string,
  isReply?: boolean
 ) => {
  console.log(content);

  console.log(id);
 };

 const user = userData;

 return (
  <>
   {comments.map((comment) => (
    <article key={comment.id} className="py-6">
     <div style={{ wordWrap: "break-word" }}>
      <CommentBox
       key={comment.id}
       content={comment.content}
       score={comment.score}
       userid={users && users.find((user) => user.id === comment.userId)?.id}
       name={users && users.find((user) => user.id === comment.userId)?.name}
       image={users && users.find((user) => user.id === comment.userId)?.image}
       modifiedAt={comment.updatedAt}
       id={comment.id}
       isReply={false}
       user={user}
       onDelete={handleCommentDelete}
       onEdit={handleEditComment}
      />

      {comment.replies && comment.replies.length > 0 && (
       <div className="replies pl-12 space-y-6 py-6">
        {comment.replies.map((reply) => (
         <CommentBox
          key={reply.id}
          content={reply.content}
          score={reply.score}
          userid={users && users.find((user) => user.id === reply.userId)?.id}
          name={users && users.find((user) => user.id === reply.userId)?.name}
          image={users && users.find((user) => user.id === reply.userId)?.image}
          modifiedAt={reply.updatedAt}
          id={reply.id}
          isReply={true}
          user={user}
          onDelete={handleCommentDelete}
          onEdit={handleEditComment}
         />
        ))}
       </div>
      )}
     </div>
    </article>
   ))}
  </>
 );
}
