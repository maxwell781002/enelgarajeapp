"use client";

import { useState, PropsWithChildren } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { Check, Copy } from "lucide-react";

export type CopyTextProps = {
  action: () => void;
} & PropsWithChildren;

export default function BaseCopyToClipboard({
  action,
  children,
}: CopyTextProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await action();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {children}
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboard}
        className="flex items-center space-x-1 border-0 shadow-none"
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
