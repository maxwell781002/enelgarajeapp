"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import BaseCopyToClipboard from "@repo/ui/components/copy-to-clipboard/base";

const size = 200;

export type QrProps = {
  addCopy?: boolean;
  value: string;
};

export default function Qr({ value, addCopy = false }: QrProps) {
  const ref = useRef(null);
  const handleCopy = () => {
    html2canvas(ref.current).then(function (canvas: any) {
      canvas.toBlob(function (blob: any) {
        navigator.clipboard
          .write([
            new ClipboardItem(
              Object.defineProperty({}, blob.type, {
                value: blob,
                enumerable: true,
              }),
            ),
          ])
          .then(function () {
            console.log("Copied to clipboard");
            // domNode.classList.remove("on");
          });
      });
    });
  };
  const qr = <QRCodeSVG value={value} size={size} />;
  if (!addCopy) return qr;
  return (
    <BaseCopyToClipboard action={handleCopy}>
      <div ref={ref}>{qr}</div>
    </BaseCopyToClipboard>
  );
}
