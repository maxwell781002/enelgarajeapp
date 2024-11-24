import { WhatsappIcon } from "@repo/ui/components/icons";
import { Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-6 text-muted-foreground mt-5">
      <div className="container flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
        <div className="flex items-center flex-col sm:flex-row sm:gap-1">
          <img src="/logo-name.png" alt="logo" className="h-[60px]" />
          <p className="text-sm">&copy; 2024 EnElGaraje</p>
        </div>
        <nav className="flex flex-col items-center gap-1 sm:gap-4 sm:flex-row text-sm">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <Link
              href="mailto:contacto@enelgaraje.com"
              className="text-sm hover:underline"
            >
              contacto@enelgaraje.com
            </Link>
          </div>
          <div className="flex items-center">
            <WhatsappIcon className="w-5 h-5 mr-2" />
            <Link
              href="https://wa.me/+5350586327"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              (+53) 50586327
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
