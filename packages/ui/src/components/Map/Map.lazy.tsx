import dynamic from "next/dynamic";
import { useMemo } from "react";
import { MapProps } from "./Map";

export default function Map(props: MapProps) {
  const Map = useMemo(() => dynamic(
    () => import('./Map'),
    {
      loading: () => <p>...</p>,
      ssr: false
    }
  ), [])
  return (
    <>
      <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map {...props} />
      </div>
    </>
  )
}