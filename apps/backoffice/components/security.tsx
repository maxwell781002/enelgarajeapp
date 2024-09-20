import { signIn, auth } from "@repo/model/lib/auth";
import { ReactNode } from "react";

type SecurityProps = {
  children: ReactNode;
};

const SignIn = () => (
  <form
    action={async () => {
      "use server";
      await signIn("google");
    }}
  >
    <button type="submit">Signin with Google</button>
  </form>
);

export default async function Security({ children }: SecurityProps) {
  const session = await auth();
  console.log(session);
  return <>{session?.user ? children : <SignIn />}</>;
}
