"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import PlaceHolderImage from "../../../public/images/avatars/image-maxblagun.png";
import timeSince from "@/utils/formatdate";
import { downVoteScore, upVoteScore } from "../actions";
import { Session } from "next-auth";
import ReplyIcon from "../../../public/images/icon-reply.svg";
import PlusIcon from "../../../public/images/icon-plus.svg";
import MinusIcon from "../../../public/images/icon-minus.svg";
import toast, { Toaster } from "react-hot-toast";

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

  if (res?.id) {
   toast.success("Upvoted!");
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
    <div className="bg-white py-4 px-6 flex flex-col-reverse sm:flex-row gap-6 rounded-xl">
     <div
      id="score-reply-wrapper"
      className="flex items-center justify-between"
     >
      <div
       id="score-button"
       className="bg-very-light-gray flex sm:flex-col gap-4 justify-center items-center text-lg space-y-1"
      >
       <span
        onClick={() => {
         startTransition(() => {
          handleUpVote(props.id);
         });
        }}
       >
        <Image src={PlusIcon} alt="plus icon" height="10" width="10" />
       </span>
       <p className="font-medium">{props.score}</p>
       <span
        onClick={() => {
         startTransition(() => {
          handledownVote(props.id);
         });
        }}
       >
        <Image src={MinusIcon} alt="plus icon" height="10" width="10" />
       </span>
      </div>
      <div id="reply" className="sm:hidden">
       <button className="flex items-center space-x-2 ">
        <Image height={16} width={16} alt="reply button" src={ReplyIcon} />
        <span>Reply</span>
       </button>
      </div>
     </div>

     <div id="content-wrapper" className="flex flex-col justify-between">
      <div
       id="reply-content-info"
       className="flex justify-between items-center"
      >
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

       <div id="reply" className="hidden sm:block">
        <button className="flex items-center space-x-2 ">
         <Image height={16} width={16} alt="reply button" src={ReplyIcon} />
         <span>Reply</span>
        </button>
       </div>
      </div>

      <div>
       <p className="text-grayish-blue mt-4">{props.content}</p>
      </div>
     </div>
    </div>
   )}
   <Toaster />
  </>
 );
}
