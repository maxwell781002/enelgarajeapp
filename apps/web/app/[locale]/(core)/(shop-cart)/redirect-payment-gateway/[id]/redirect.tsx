"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPayment({ link }: { link: string }) {
  const router = useRouter();
  useEffect(() => {
    router.push(link);
  }, []);
  return null;
}
