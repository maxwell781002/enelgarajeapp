import BaseImage from "next/image";

export default function Image({ src, ...props }: any) {
  return <BaseImage src={src.downloadUrl} {...props} />;
}
