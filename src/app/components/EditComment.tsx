import Image from "next/image";
import EditIcon from "../../../public/images/icon-edit.svg";

type EditCommentProps = {
 onClick: (e: React.MouseEvent) => void;
} & React.ComponentProps<"button">;

export default function EditComment({ onClick }: EditCommentProps) {
 return (
  <button className="flex gap-2 items-center" onClick={onClick}>
   <Image src={EditIcon} alt="edit icon" height={16} width={16} />
   <span>Edit</span>
  </button>
 );
}
