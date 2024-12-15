import { Check, CircleX } from "lucide-react";

export default function ActiveInactive({ active }: { active: boolean }) {
  return (
    <>
      {active ? (
        <Check className="text-green-500 inline-block w-4 h-4" />
      ) : (
        <CircleX className="text-red-500 inline-block w-4 h-4" />
      )}
    </>
  );
}
