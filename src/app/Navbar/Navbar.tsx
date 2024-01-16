import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";

export default async function Navbar() {
 const session = await getServerSession();

 console.log(session);

 return (
  <div className="navbar bg-base-100">
   <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
   </div>
   <div className="flex-none">
    <UserMenuButton session={session} />
   </div>
  </div>
 );
}
