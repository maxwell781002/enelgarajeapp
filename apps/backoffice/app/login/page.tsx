import { signIn } from "@repo/model/lib/auth";
import SignIn from "@repo/ui/components/signin";
import { getTranslations } from "next-intl/server";

export default async function Security() {
  const t = await getTranslations("Security");
  const action = async (provider: string) => {
    "use server";
    await signIn(provider);
  };
  return (
    <SignIn title={t("title")} description={t("description")} signIn={action} />
  );
}
