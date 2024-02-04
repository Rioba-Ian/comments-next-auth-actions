import Image from "next/image";
import DeleteIcon from "../../../public/images/icon-delete.svg";

type DeleteCommentButtonProps = {
 variant: "comment" | "reply";
 idCommentReply: number;
} & React.ComponentProps<"button">;

function DeleteComment({ variant, idCommentReply }: DeleteCommentButtonProps) {
 return (
  <button className="flex gap-2 items-center">
   <Image src={DeleteIcon} alt="Delete Icon" height={16} width={16} />
   <span>Delete</span>
  </button>
 );
}

export default DeleteComment;
