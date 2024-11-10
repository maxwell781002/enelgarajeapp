import { Alert, AlertDescription } from "@repo/ui/components/ui/alert";

export type AlertMessageProps = {
  variant?: "default" | "destructive";
  text: string;
};

export default function AlertMessage({
  variant = "default",
  text,
}: AlertMessageProps) {
  return (
    <Alert variant={variant} className="mb-6">
      <AlertDescription>{text}</AlertDescription>
    </Alert>
  );
}
