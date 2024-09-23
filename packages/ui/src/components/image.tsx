import BaseImage from "next/image";

export default function Image({ src, ...props }: any) {
  const url = JSON.parse(src).downloadUrl;
  return <BaseImage src={url} {...props} />;
}
