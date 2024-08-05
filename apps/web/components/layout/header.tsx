import Link from "next/link";
import { CompleteBusiness } from "@repo/model/zod/business";
import { getCurrentOrder } from "@repo/model/repository/order";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import {
  MountainIcon,
  MenuIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  ShoppingCartIcon,
} from "@repo/ui/components/icons";

export async function Header({
  business,
  locale,
}: {
  business: CompleteBusiness;
  locale: string;
}) {
  const order = await getCurrentOrder();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full bg-background shadow-lg flex items-center justify-between bg-background px-4 py-3 shadow-sm">
      <Link
        href={`/${locale}/${business.slug}`}
        className="flex items-center gap-2"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Acme</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6 text-muted-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="grid gap-4 p-4">
            <Link
              href={`/${locale}/${business.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              Home
            </Link>
            <Link
              href={`/${locale}/${business.slug}/about-us`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <InfoIcon className="h-5 w-5" />
              About
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <MailIcon className="h-5 w-5" />
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="relative">
        <Link
          href={`/${locale}/${business.slug}/shopping-cart`}
          className="flex items-center gap-2"
          prefetch={false}
        >
          <ShoppingCartIcon className="w-6 h-6" />
          <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {order?.numberOfItems || 0}
          </span>
        </Link>
      </div>
    </header>
  );
}
