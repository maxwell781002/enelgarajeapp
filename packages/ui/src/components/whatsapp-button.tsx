import { cn } from "../lib/utils";
import { WhatsappIcon } from "./icons";
import { Button } from "./ui/button";

export type WhatsappButtonProps = {
  whatsappNumber: string;
  whatsappMessage: string;
  text: string;
  className?: string;
};

export default async function WhatsappButton({
  whatsappNumber,
  whatsappMessage,
  text,
  className,
}: WhatsappButtonProps) {
  return (
    <Button asChild className={cn("flex items-center space-x-2", className)}>
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsappIcon className="w-5 h-5" />
        <span>{text}</span>
      </a>
    </Button>
  );
}
