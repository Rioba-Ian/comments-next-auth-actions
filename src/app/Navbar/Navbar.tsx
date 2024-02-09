import { authOptions } from "@/utils/authOptions";
import UserMenuButton from "./UserMenuButton";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { getComments } from "../actions";
import FrontendMentorIcon from "../../../public/images/icon-frontend-mentor.svg";

export default async function Navbar() {
 const session = await getServerSession(authOptions);

 const userData = await getComments(session);

 return (
  <div className=" bg-base-200">
   <div className="nav-content navbar max-w-7xl mx-auto">
    <div className="flex-1">
     <Link
      href="https://www.frontendmentor.io/profile/Rioba-Ian"
      target="_blank"
      className="btn btn-ghost text-xl"
     >
      <Image
       src={FrontendMentorIcon}
       height={32}
       width={32}
       alt="Frontend Mentor"
      />
     </Link>
    </div>
    <div className="flex-none">
     <UserMenuButton session={session} />
    </div>
   </div>
  </div>
 );
}
