import React from "react";
import Image from "next/image";
import PlaceHolderImage from "../../../public/images/avatars/image-maxblagun.png";

type UserInfo = {
 id: number;
 image?: string | null | undefined;
 name: string | null;
};

type CommentBoxProps = UserInfo & {
 score: number;
 content: string;
};

export default function CommentBox(props: CommentBoxProps) {
 console.log(props.image, "props.users");

 return (
  <div className="bg-white py-4 px-6 flex gap-6 rounded-xl">
   <div
    id="score-button"
    className="bg-very-light-gray flex flex-col justify-center items-center text-lg space-y-1"
   >
    <span>+</span>
    <p className="font-medium">{props.score}</p>
    <span>-</span>
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
    </div>
    <div>
     <p className="text-grayish-blue mt-4">{props.content}</p>
    </div>
   </div>
  </div>
 );
}
