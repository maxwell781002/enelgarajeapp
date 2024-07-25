import dynamic from "next/dynamic";
import { MapProps } from "./Map";

const DynamicMap = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function Map(props: MapProps) {
  return <DynamicMap {...props} />;
}
