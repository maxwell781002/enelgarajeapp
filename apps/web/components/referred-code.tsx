"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const ReferredCode = ({ children }: { children: React.ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["referredCode"]);
  const searchParams = useSearchParams();
  const referredCode = searchParams.get("rc");
  useEffect(() => {
    if (!referredCode) return;
    setCookie("referredCode", referredCode);
  }, [referredCode]);
  return children;
};
