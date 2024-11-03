import { QRCodeSVG } from "qrcode.react";
import { useCallback, useRef } from "react";
import html2canvas from "html2canvas";

const size = 200;

export type QrProps = {
  addCopy?: boolean;
  value: string;
};

export default function Qr({ value, addCopy = false }: QrProps) {
  const ref = useRef(null);
  const handleCopy = useCallback(() => {
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
  }, [ref]);
  return (
    <div>
      <div
        style={{ width: size, height: size }}
        className="flex justify-center"
      >
        <div ref={ref}>
          <QRCodeSVG value={value} size={size} />
        </div>
      </div>
      {addCopy && <button onClick={handleCopy}>Copy</button>}
    </div>
  );
}
