import React from "react";
import FormSubmitButton from "./FormSubmitButton";
import Image from "next/image";
import ProfilePicPlaceHolder from "@/app/assets/profile-pic-placeholder.png";

type User = {
 id: number;
 name: string | null;
 image: string | null;
 email: string;
};

type CommentFormProps = {
 user: User;
};

export default function CommentForm({ user }: CommentFormProps) {
 return (
  <section className="w-full">
   <form
    action=""
    className="grid grid-col-1 grid-row-2 sm:grid-row-1 sm:grid-cols-12 -order-1"
   >
    <div id="user-profile" className="hidden sm:block">
     {/* user profile picture here */}
     <Image
      src={user.image ?? ""}
      alt={user.name || "anonymous user"}
      width={32}
      height={32}
      className="rounded-full"
     />
    </div>

    <div
     id="form-box"
     className="col-span-11 flex flex-col sm:flex-row items-start gap-4"
    >
     <textarea
      rows={4}
      placeholder="Add a comment..."
      className="py-2 px-4 w-full rounded-lg focus-visible:border-gray-500 focus-visible:ring-gray-500"
     ></textarea>
     <div className="w-full flex flex-row items-center justify-between">
      <div id="user-profile" className="sm:hidden">
       {/* user profile picture here */}
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
