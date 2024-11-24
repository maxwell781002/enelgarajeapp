import Link from "next/link";
import { CompleteBusiness } from "@repo/model/zod/business";
import { getCurrentOrder } from "@repo/model/repository/order";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@repo/ui/components/ui/sheet";
import { Button } from "@repo/ui/components/ui/button";
import SignInIcon, {
  MenuIcon,
  HomeIcon,
  InfoIcon,
  ShoppingCartIcon,
  PackageIcon,
} from "@repo/ui/components/icons";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { signOut } from "@repo/model/lib/auth";
import { Logout } from "./logout";
import { MapPinIcon } from "lucide-react";

export async function Header({
  business,
  locale,
  logo,
}: {
  business: CompleteBusiness;
  locale: string;
  logo: string;
}) {
  const order = await getCurrentOrder();
  const user = await getCurrentUser();
  const t = await getTranslations("Header");
  const logoutAction = async () => {
    "use server";
    return signOut();
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-14 w-full bg-background shadow-lg flex items-center justify-between bg-background px-4 py-3 shadow-sm">
      <Link
        href={`/${locale}`}
        className="flex items-center gap-2"
        prefetch={false}
      >
        <img src={logo} alt="logo" className="h-7" />
        <span className="text-lg font-semibold">{business.name}</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6 text-muted-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="grid gap-4 p-4">
            {!!user?.name && (
              <div className="border-b border-muted-foreground/10 pb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <img
                  src={user.image}
                  referrerPolicy="no-referrer"
                  alt={"user name"}
                  className="aspect-square rounded-md object-cover h-10 w-10"
                />
                {user?.name}
              </div>
            )}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/about-us`}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              <InfoIcon className="h-5 w-5" />
              {t("about")}
            </Link>
            {!!user?.name && (
              <>
                <Link
                  href={`/${locale}/order`}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <PackageIcon className="h-5 w-5" />
                  {t("order")}
                </Link>
                <Link
                  href={`/${locale}/address-user`}
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <MapPinIcon className="h-5 w-5" />
                  {t("address-user")}
                </Link>
              </>
            )}
            {!user ? (
              <Link
                href={`/${locale}/auth/login`}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <SignInIcon className="h-5 w-5" />
                {t("login")}
              </Link>
            ) : (
              <Logout title={t("logout")} action={logoutAction} />
            )}
          </div>
        </SheetContent>
      </Sheet>
      <div className="relative">
        <Link
          href={`/${locale}/shopping-cart`}
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
