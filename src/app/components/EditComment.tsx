import Image from "next/image";
import EditIcon from "../../../public/images/icon-edit.svg";

export default function EditComment() {
 return (
  <button className="flex gap-2 items-center">
   <Image src={EditIcon} alt="edit icon" height={16} width={16} />
   <span>Edit</span>
  </button>
 );
}
