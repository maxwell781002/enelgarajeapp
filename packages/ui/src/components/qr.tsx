"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import html2canvas from "html2canvas";
import BaseCopyToClipboard from "@repo/ui/components/copy-to-clipboard/base";

const size = 200;

export type QrProps = {
  addCopy?: boolean;
  value: string;
  image?: string;
};

export default function Qr({ value, image, addCopy = false }: QrProps) {
  const ref = useRef(null);
  const handleCopy = () => {
    if (!ref.current) return;
    html2canvas(ref.current as any).then(function (canvas: any) {
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
  const imageSettings = image
    ? { src: image, height: 50, width: 50, excavate: true }
    : undefined;
  const qr = (
    <QRCodeSVG value={value} size={size} imageSettings={imageSettings} />
  );
  if (!addCopy) return qr;
  return (
    <BaseCopyToClipboard action={handleCopy}>
      <div ref={ref}>{qr}</div>
    </BaseCopyToClipboard>
  );
}
