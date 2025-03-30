"use client";

import { DownloadIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui/components/button";
import { useTransition } from "react";

export type ButtonDownloadFileProps = {
  url: string;
  label: string;
  fileName: string;
};

export default function ButtonDownloadFile({
  url,
  label,
  fileName,
}: ButtonDownloadFileProps) {
  const [loading, startLoading] = useTransition();
  const handleExport = async () => {
    startLoading(async () => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute("download", `${fileName}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error("Error exporting PDF:", error);
      }
    });
  };
  return (
    <Button
      variant="outline"
      onClick={handleExport}
      loading={loading}
      loadingText={label}
    >
      <DownloadIcon /> {label}
    </Button>
  );
}
