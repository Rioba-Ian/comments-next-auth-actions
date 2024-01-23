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
  <div className="bg-white p-6 flex">
   <div
    id="score-button"
    className="bg-very-light-gray flex flex-col justify-center items-center text-lg space-y-2"
   >
    <span>+</span>
    <p>{props.score}</p>
    <span>-</span>
   </div>
   <div id="content-wrapper" className="flex flex-col">
    <div id="content" className="flex items-center">
     <div id="profile">
      <Image
       src={props.image || PlaceHolderImage}
       height={36}
       width={36}
       alt="some placeholder image"
      />
     </div>

     <p>{props.name}</p>
    </div>
    <div>
     <p>{props.content}</p>
    </div>
   </div>
  </div>
 );
}
