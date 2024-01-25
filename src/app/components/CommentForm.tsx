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
 console.log(user.image);

 return (
  <section className="w-full">
   <form action="" className="">
    <div id="user-profile">
     {/* user profile picture here */}
     <Image
      src={user.image ?? ProfilePicPlaceHolder}
      alt={user.name || "anonymous user"}
      width={32}
      height={32}
     />
    </div>

    <div id="form-box" className="flex items-start gap-4">
     <textarea
      rows={4}
      className="py-2 px-4 w-full rounded-lg focus-visible:border-gray-500 focus-visible:ring-gray-500"
     ></textarea>
     <FormSubmitButton className="py-2 px-4 rounded-lg bg-moderate-blue text-white ">
      Send
     </FormSubmitButton>
    </div>
   </form>
  </section>
 );
}
