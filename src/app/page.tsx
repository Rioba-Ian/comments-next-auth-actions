import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Comment from "./components/Comment";
import { getComments, getUser, getUsers } from "./actions";
import CommentForm from "./components/CommentForm";

export default async function Home() {
 const session = await getServerSession(authOptions);

 const commentsData = await getComments(session);

 const usersData = await getUsers(session);

 const userData = await getUser(session);

 return (
  <section className="max-w-2xl mx-auto my-10 py-4">
   {commentsData && <Comment comments={commentsData} users={usersData || []} />}
   {userData && <CommentForm user={userData} variant="comment" />}
  </section>
 );
}
