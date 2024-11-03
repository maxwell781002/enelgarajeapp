"use client";

import BaseCopyToClipboard from "@repo/ui/components/copy-to-clipboard/base";

interface CopyTextProps {
  text: string;
  buttonText?: string;
}

export default function CopyToClipboard({ text }: CopyTextProps) {
  const copyToClipboard = async () => {
    return navigator.clipboard.writeText(text);
  };

  return (
    <BaseCopyToClipboard action={copyToClipboard}>
      <span className="text-sm text-muted-foreground">{text}</span>
    </BaseCopyToClipboard>
  );
}
