"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectAfterLogin({
  redirectAfterLogin,
}: {
  redirectAfterLogin?: string;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(redirectAfterLogin || "/");
    }
  }, [status]);

  return <></>;
}
