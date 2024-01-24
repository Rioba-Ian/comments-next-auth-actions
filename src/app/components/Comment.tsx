import React from "react";
import { Comment as CommentType } from "../lib/api";
import CommentBox from "./CommentBox";

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

export default function Comment({ comments, users }: CommentProps) {
 console.log(
  comments.map((comment) => comment.replies),
  "repliesComponent"
 );

 if (!comments || comments.length === 0) {
  return null;
 }

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
       <div className="replies pl-8 space-y-6 py-6">
        {comment.replies.map((reply) => (
         <CommentBox
          key={reply.id}
          content={reply.content}
          score={reply.score}
          id={users && users.find((user) => user.id === reply.userId)?.id}
          name={users && users.find((user) => user.id === reply.userId)?.name}
          image={users && users.find((user) => user.id === reply.userId)?.image}
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
