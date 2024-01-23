import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Comment from "./components/Comment";
import { getComments, getUsers } from "./actions";

export default async function Home() {
 const session = await getServerSession(authOptions);

 const commentsData = await getComments(session);

 const userData = await getUsers(session);

 console.log(session, "session");

 return (
  <section className="max-w-2xl mx-auto">
   {commentsData && <Comment comments={commentsData} users={userData} />}
  </section>
 );
}
