import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if(!session?.user) {
        redirect('/auth/login')
    }

  return (
    <div>
      <h1>Seccíon de usuario</h1>
      <pre>
        {
            JSON.stringify(session.user, null, 2)
        }
      </pre>
    </div>
  );
}