"use client";
import React, { useRef } from "react";
import FormSubmitButton from "./FormSubmitButton";
import Image from "next/image";
import ProfilePicPlaceHolder from "@/app/assets/profile-pic-placeholder.png";
import { sendComment, sendReply } from "../actions";
import { redirect } from "next/navigation";

export type User = {
 id: number;
 name: string | null;
 image: string | null;
 email: string;
 emailVerified: Date | null;
};

type CommentFormProps = {
 user: User;
 variant: "comment" | "reply";
 commentId?: number;
};

export default function CommentForm({
 user,
 variant,
 commentId,
}: CommentFormProps) {
 if (!user) {
  console.log("user not found");

  redirect("/login");
 }

 const formRef = useRef<HTMLFormElement>(null);

 const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);

  if (variant === "reply" && commentId) {
   await sendReply(user.id, formData, commentId);
  } else {
   await sendComment(user.id, formData);
  }
  formRef.current?.reset();
 };

 return (
  <section className="w-full">
   <form
    ref={formRef}
    onSubmit={onSubmitHandler}
    data-aftersubmit=""
    className="grid grid-col-1 grid-row-2 sm:grid-row-1 sm:grid-cols-12 -order-1"
   >
    <div id="user-profile" className="hidden sm:block">
     {/* user profile picture here */}
     <Image
      src={user.image ?? ProfilePicPlaceHolder}
      alt={user.name || "anonymous user"}
      width={32}
      height={32}
      className="rounded-full"
     />
    </div>

    <div
     id="form-box"
     className="col-span-11 sm:flex  sm:flex-row items-start gap-4 space-y-4"
    >
     <textarea
      id="content"
      name="content"
      minLength={2}
      maxLength={255}
      required
      rows={4}
      placeholder="Add a comment..."
      className="py-2 px-4 block w-full sm:grow rounded-lg focus-visible:border-gray-500 focus-visible:ring-gray-500"
     ></textarea>
     <div className="  flex flex-row items-center justify-between">
      <div id="user-profile" className="sm:hidden">
       <Image
        src={user.image ?? ""}
        alt={user.name || "anonymous user"}
        width={32}
        height={32}
        className="rounded-full block"
       />
      </div>
      <FormSubmitButton className="py-2 px-4 rounded-lg bg-moderate-blue text-white ">
       Send
      </FormSubmitButton>
     </div>
    </div>
   </form>
  </section>
 );
}
