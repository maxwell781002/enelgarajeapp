"use client";
import CopyToClipboard from "@repo/ui/components/copy-to-clipboard/copy-to-clipboard-text";
import { Button } from "@repo/ui/components/ui/button";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type GenerateLinkProps = {
  businessId: string;
};

export default function GenerateLink({ businessId }: GenerateLinkProps) {
  const t = useTranslations("User");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const handleButton = async () => {
    setLoading(true);
    const data = await fetch(`/api/invitation-link?businessId=${businessId}`, {
      method: "POST",
    });
    const json = await data.json();
    setCode(json.link);
  };
  return (
    <>
      {code ? (
        <CopyToClipboard text={code} />
      ) : (
        <Button onClick={handleButton} disabled={loading}>
          {t("generateLink")}
        </Button>
      )}
    </>
  );
}
