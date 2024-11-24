import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";

export type AlertMessageProps = {
  variant?: "default" | "destructive";
  text: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function AlertMessage({
  variant = "default",
  text,
  Icon,
}: AlertMessageProps) {
  return (
    <Alert variant={variant} className="mb-6">
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
