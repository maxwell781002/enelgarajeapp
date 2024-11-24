import Link from "next/link";
import { LockIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function NoUser() {
  const t = await getTranslations("Checkout");
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-10 text-center">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full p-3">
              <LockIcon className="h-12 w-12" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t("authentication_required")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("authentication_required_description")}
          </p>
        </div>
        <div className="pt-4">
          <Button asChild className="w-full">
            <Link href="/auth/login?redirectAfterLogin=/checkout">
              {t("login")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
