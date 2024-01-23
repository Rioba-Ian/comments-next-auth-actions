import React from "react";
import { Comment as CommentType } from "../lib/api";
import CommentBox from "./CommentBox";
import { User } from "@prisma/client";

type CommentProps = {
 comments: CommentType[];
 users: User[];
};

export default function Comment({ comments, users }: CommentProps) {
 console.log(comments, "commentsComponent");

 if (!comments || comments.length === 0) {
  return null;
 }

 console.log(users, "users");

 return (
  <>
   {comments.map((comment) => (
    <article key={comment.id} className="py-6">
     <div style={{ wordWrap: "break-word" }}>
      <CommentBox
       content={comment.content}
       score={comment.score}
       id={users && users.find((user) => user.id === comment.userId)?.id}
       name={users && users.find((user) => user.id === comment.userId)?.name}
       image={users && users.find((user) => user.id === comment.userId)?.image}
      />

      {comment.replies && comment.replies.length > 0 && (
       <div className="replies text-red-600 pl-8">
        {comment.replies.map((reply) => (
         <Comment key={reply.id} comments={[reply]} users={users} />
        ))}
       </div>
      )}
     </div>
    </article>
   ))}
  </>
 );
}
