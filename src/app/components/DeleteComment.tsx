"use client";
import DeleteIcon from "../../../public/images/icon-delete.svg";
import Image from "next/image";

type DeleteCommentProps = {
 uniqueKey: string;
 confirmDelete?: boolean;
 setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
 handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
};

export default function DeleteComment({
 uniqueKey,
 handleDelete,
 confirmDelete,
 setConfirmDelete,
}: DeleteCommentProps) {
 return (
  <>
   <button
    disabled={confirmDelete}
    className="btn btn-ghost flex gap-2 items-center"
    onClick={(e) => {
     setConfirmDelete(false);
     (document.getElementById(`${uniqueKey}`) as HTMLFormElement).showModal();
     e.stopPropagation();
    }}
   >
    {confirmDelete ? (
     <span className="loading loading-spinner loading-sm"></span>
    ) : (
     <>
      <Image src={DeleteIcon} alt="Delete Icon" height={16} width={16} />
      <span>Delete</span>
     </>
    )}
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
       onClick={async (e) => {
        setConfirmDelete(true);
        await handleDelete(e);
        (document.getElementById(`${uniqueKey}`) as HTMLFormElement).close();
        e.stopPropagation();
       }}
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
