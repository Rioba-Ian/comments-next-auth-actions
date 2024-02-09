// discontinued creating my own custom dialog component.

"use client";
import React from "react";

export default function DeleteModal() {
 //  const [showModal] = useAtom(modalAtom);

 //  console.log(showModal);

 //  console.log(showModal && "show modal");

 return (
  <>
   <button
    className="btn"
    onClick={() =>
     (document.getElementById("my_modal_2") as HTMLFormElement).showModal()
    }
   >
    open modal
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

const Modal = () => {
 return (
  <div className="bg-red-500 w-28 h-22">
   <h1>Modal</h1>
  </div>
 );
};
