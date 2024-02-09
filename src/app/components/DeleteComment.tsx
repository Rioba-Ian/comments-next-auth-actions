import Image from "next/image";
import DeleteIcon from "../../../public/images/icon-delete.svg";

type DeleteCommentButtonProps = {
 variant: "comment" | "reply";
 idCommentReply: number;
} & React.ComponentProps<"button">;

function DeleteComment({ variant, idCommentReply }: DeleteCommentButtonProps) {
 return (
  <>
   <button
    className="btn btn-ghost flex gap-2 items-center"
    onClick={() =>
     (document.getElementById("my_modal_2") as HTMLFormElement).showModal()
    }
   >
    <Image src={DeleteIcon} alt="Delete Icon" height={16} width={16} />
    <span>Delete</span>
   </button>
   <dialog id="my_modal_2" className="modal">
    <div className="modal-box">
     <h3 className="font-bold text-lg">Hello!</h3>
     <p className="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  </>
 );
}

export default DeleteComment;
