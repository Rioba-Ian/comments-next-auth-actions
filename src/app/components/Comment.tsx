import React, { useState } from "react";
import { Comment as CommentType } from "../lib/api";
import CommentBox from "./CommentBox";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { getUser } from "../actions";

type User = {
 id: number;
 email: string;
 name: string | null;
 image: string | null;
};

type CommentProps = {
 comments: CommentType[];
 users: User[];
};

export default async function Comment({ comments, users }: CommentProps) {
 const session = await getServerSession(authOptions);

 if (!comments || comments.length === 0) {
  return null;
 }

 const user = await getUser(session);

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
       session={session}
       isReply={false}
       user={user}
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
          session={session}
          isReply={true}
          user={user}
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
