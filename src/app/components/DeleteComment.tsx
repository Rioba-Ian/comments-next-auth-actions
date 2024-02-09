import Image from "next/image";
import DeleteIcon from "../../../public/images/icon-delete.svg";

type DeleteCommentButtonProps = {
 variant: "comment" | "reply";
 idCommentReply: number;
 uniqueKey: string;
} & React.ComponentProps<"button">;

function DeleteComment({
 variant,
 idCommentReply,
 uniqueKey,
}: DeleteCommentButtonProps) {
 // TODO: Update the UI once the button of deleting is clicked.
 if (variant === "comment") {
  // deal with deleting a comment
 } else {
  // deal with deleting a reply
 }
 return (
  <>
   <button
    className="btn btn-ghost flex gap-2 items-center"
    onClick={() =>
     (document.getElementById(`${uniqueKey}`) as HTMLFormElement).showModal()
    }
   >
    <Image src={DeleteIcon} alt="Delete Icon" height={16} width={16} />
    <span>Delete</span>
   </button>
   <dialog id={`${uniqueKey}`} className="modal">
    <div className="modal-box">
     <h3 className="font-bold text-lg">Delete Comment</h3>
     <p className="py-4">
      Are you sure you want to delete this comment? This will remove the comment
      and cannot be undone.
     </p>
     <div className="flex items-center justify-between uppercase">
      <button
       className="btn btn-neutral uppercase"
       onClick={() =>
        (document.getElementById(`${uniqueKey}`) as HTMLFormElement).close()
       }
      >
       No, Cancel
      </button>
      <button
       className="btn bg-soft-red text-white uppercase"
       onClick={() =>
        (document.getElementById(`${uniqueKey}`) as HTMLFormElement).close()
       }
      >
       Delete
      </button>
     </div>
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  </>
 );
}

export default DeleteComment;
