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
   <form action="" className="grid grid-cols-12">
    <div id="user-profile" className="">
     {/* user profile picture here */}
     <Image
      src={user.image ?? ""}
      alt={user.name || "anonymous user"}
      width={32}
      height={32}
      className="rounded-full"
     />
    </div>

    <div id="form-box" className="col-span-10 flex items-start gap-4">
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
