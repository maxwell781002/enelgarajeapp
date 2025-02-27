import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";
import { cn } from "@repo/ui/lib/utils";

export type AlertMessageProps = {
  variant?: "default" | "destructive";
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  flashing?: boolean;
};

export default function AlertMessage({
  variant = "default",
  text,
  Icon,
  flashing,
  className,
}: AlertMessageProps) {
  return (
    <Alert
      variant={variant}
      className={cn("mb-6", className, flashing ? "animate-flash" : "")}
    >
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
