import { authOptions } from "@/utils/authOptions";
import UserMenuButton from "./UserMenuButton";
import { Session, getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { getComments } from "../actions";

export default async function Navbar() {
 const session = await getServerSession(authOptions);

 const userData = await getComments(session);

 console.log(userData, "userData");

 return (
  <div className="navbar bg-base-100">
   <div className="flex-1">
    <Link
     href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9"
     target="_blank"
     className="btn btn-ghost text-xl"
    >
     <Image
      src="https://www.frontendmentor.io/static/images/logo-desktop.svg"
      height={90}
      width={180}
      alt="Frontend Mentor"
     />
    </Link>
   </div>
   <div className="flex-none">
    <UserMenuButton session={session} />
   </div>
  </div>
 );
}
