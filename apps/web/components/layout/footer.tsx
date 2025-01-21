import { WhatsappIcon } from "@repo/ui/components/icons";
import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type FooterProps = {
  logo: string;
  email: string;
  phone: string;
};

export function Footer({ logo, email, phone }: FooterProps) {
  const date = new Date();
  return (
    <footer className="bg-muted py-6 text-muted-foreground mt-5">
      <div className="container flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
        <div className="flex items-center flex-col sm:flex-row sm:gap-1">
          <Image src={logo} alt="logo" width={60} height={60} />
          <p className="text-sm">&copy; {date.getFullYear()} EnElGaraje</p>
        </div>
        <nav className="flex flex-col items-center gap-1 sm:gap-4 sm:flex-row text-sm">
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-primary mr-2" />
            <Link
              href={`mailto:${email}`}
              className="text-sm hover:underline"
            >
              {email}
            </Link>
          </div>
          <div className="flex items-center">
            <WhatsappIcon className="w-5 h-5 mr-2" />
            <Link
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              {phone}
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
