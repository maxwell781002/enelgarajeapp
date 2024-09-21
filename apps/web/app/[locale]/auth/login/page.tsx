import { signIn, auth } from "@repo/model/lib/auth";
import SignIn from "@repo/ui/components/signin";
import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

type SecurityProps = {
  children: ReactNode;
};

export default async function Page({ children }: SecurityProps) {
  const session = await auth();
  const t = await getTranslations("Security");
  const action = async (provider: string) => {
    "use server";
    await signIn(provider);
  };
  return (
    <>
      {session?.user ? (
        children
      ) : (
        <SignIn
          title={t("title")}
          description={t("description")}
          signIn={action}
        />
      )}
    </>
  );
}
