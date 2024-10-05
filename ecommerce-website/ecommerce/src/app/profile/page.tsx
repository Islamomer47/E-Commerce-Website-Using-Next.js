import { redirect } from "next/navigation";
import { verifyJWT } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const token = cookies().get("authToken")?.value;

  if (!token || !(await verifyJWT(token))) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Welcome to your profile!</h1>
      {/* Additional profile data can be fetched and displayed */}
    </div>
  );
}
