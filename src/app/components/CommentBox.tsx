"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import PlaceHolderImage from "../../../public/images/avatars/image-maxblagun.png";
import timeSince from "@/utils/formatdate";
import { downVoteScore, upVoteScore } from "../actions";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";

type UserInfo = {
 userid: number | undefined;
 image?: string | null | undefined;
 name: string | null | undefined;
};

type CommentBoxProps = UserInfo & {
 id: number;
 score: number;
 content: string;
 modifiedAt: Date | null;
 session: Session | null;
 isReply?: boolean;
};

export default function CommentBox(props: CommentBoxProps) {
 const [isPending, startTransition] = useTransition();

 const handleUpVote = async (id: number) => {
  const res = await upVoteScore(
   props.session,
   props.isReply ? { replyId: id } : { commentId: id }
  );

  if (res) {
   console.log("upvoted");
  }
 };

 const handledownVote = async (id: number) => {
  const res = await downVoteScore(
   props.session,
   props.isReply ? { replyId: id } : { commentId: id }
  );

  if (res) {
   console.log("upvoted");
  }
 };

 return (
  <>
   {isPending && (
    <>
     <div className="skeleton h-32 w-full"></div>
    </>
   )}
   {!isPending && (
    <div className="bg-white py-4 px-6 flex gap-6 rounded-xl">
     <div
      id="score-button"
      className="bg-very-light-gray flex flex-col justify-center items-center text-lg space-y-1"
     >
      <span
       onClick={() => {
        startTransition(() => {
         handleUpVote(props.id);
        });
       }}
      >
       +
      </span>
      <p className="font-medium">{props.score}</p>
      <span
       onClick={() => {
        startTransition(() => {
         handledownVote(props.id);
        });
       }}
      >
       -
      </span>
     </div>
     <div id="content-wrapper" className="flex flex-col justify-between">
      <div id="content" className="flex gap-3 items-center">
       <div id="profile">
        <Image
         src={props.image || PlaceHolderImage}
         height={36}
         width={36}
         alt="some placeholder image"
        />
       </div>

       <p className="font-semibold">{props.name}</p>
       <span className="text-grayish-blue">
        {props.modifiedAt && timeSince(props.modifiedAt)}
       </span>
      </div>
      <div>
       <p className="text-grayish-blue mt-4">{props.content}</p>
      </div>
     </div>
    </div>
   )}
  </>
 );
}
