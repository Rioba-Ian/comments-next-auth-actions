import React from "react";
import FormSubmitButton from "./FormSubmitButton";

export default function CommentForm() {
 return (
  <section className="w-full">
   <form action="" className="">
    <div id="user-profile">{/* user profile picture here */}</div>

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
