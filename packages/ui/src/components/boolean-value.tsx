import { Check, CircleX } from "lucide-react";

export default function BooleanValue({ value }: { value: boolean }) {
  return (
    <>
      {value ? (
        <Check
          className={`${
            value ? "text-green-500" : "text-red-500"
          } inline-block w-4 h-4`}
        />
      ) : (
        <CircleX
          className={`${
            value ? "text-green-500" : "text-red-500"
          } inline-block w-4 h-4`}
        />
      )}
    </>
  );
}
