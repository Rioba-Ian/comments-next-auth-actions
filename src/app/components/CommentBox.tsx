import React from "react";
import Image from "next/image";
import PlaceHolderImage from "../../../public/images/avatars/image-maxblagun.png";

type CommentBoxProps = {
 image?: string;
 score: number;
 content: string;
};

export default function CommentBox(props: CommentBoxProps) {
 return (
  <div className="flex bg-white p-6">
   <div id="score-button" className="bg-grayish-blue">
    <span>+</span>
    <p>{props.score}</p>
    <span>-</span>
   </div>
   <div id="content" className="flex flex-col">
    <div id="profile">
     <Image
      src={PlaceHolderImage}
      height={24}
      width={24}
      alt="some placeholder image"
     />
    </div>

    <p>{props.content}</p>
   </div>
  </div>
 );
}
