import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-muted py-6 text-muted-foreground">
      <div className="container flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
        <p className="text-sm">&copy; 2024 Acme Restaurant</p>
        <nav className="flex gap-4 text-sm">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
