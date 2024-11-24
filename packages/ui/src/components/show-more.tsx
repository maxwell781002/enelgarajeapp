import { Button, ButtonProps } from "@repo/ui/components/ui/button";
import { ArrowDownToDot } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Paginator({
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button variant={"outline"} disabled={disabled} {...props}>
      {disabled ? (
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ArrowDownToDot className="mr-2 h-4 w-4" />
      )}
      {children}
    </Button>
  );
}
