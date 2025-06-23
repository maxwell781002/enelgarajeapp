import { Button } from "@repo/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { cn } from "@repo/ui/lib/utils";
import { getTranslations } from "next-intl/server";
import { SecurityUser, signOut } from "packages/model/lib/auth";
import Link from "next/link";
import SwitchApp from "@repo/ui/components/switch-app";
import { ApplicationsNames } from "packages/model/lib/applications-names";
import { CompleteBusiness } from "packages/model/prisma/zod";
import { Logout } from "./logout";
import SignInIcon from "@repo/ui/components/icons";
import User from "@repo/ui/components/user";

const MenuIcon = ({ openLabel }: { openLabel?: string }) => (
  <>
    <span className="mr-2 font-medium">{openLabel}</span>
    <div id="nav-toggle" className="focus:outline-none">
      <svg className="h-3 fill-current block menu-open" viewBox="0 0 20 20">
        <title>Menu Open</title>
        <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
      </svg>
    </div>
  </>
);
const MenuMobileIcon = () => (
  <label className="cursor-pointer flex items-center text-text-dark dark:text-white border border-border dark:border-border/40 p-1 rounded-md">
    <div id="nav-toggle-mobile" className="focus:outline-none">
      <svg className="h-5 fill-current block menu-open" viewBox="0 0 20 20">
        <title>Menu Open</title>
        <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
      </svg>
    </div>
  </label>
);

export type MenuProps = {
  locale: string;
  isMobile?: boolean;
  user?: SecurityUser;
  business: CompleteBusiness;
};

export default async function Menu({
  locale,
  isMobile = false,
  user,
  business,
}: MenuProps) {
  const t = await getTranslations("Header");
  const logoutAction = async () => {
    "use server";
    return signOut();
  };
  let menu: { name: string; url: string }[] = [
    {
      name: t("home"),
      url: `/${locale}`,
    },
    {
      name: t("about"),
      url: `/${locale}/about-us`,
    },
  ];
  if (user) {
    menu = menu.concat([
      {
        name: t("order"),
        url: `/${locale}/order`,
      },
      {
        name: t("address-user"),
        url: `/${locale}/address-user`,
      },
    ]);
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="order-3 cursor-pointer flex items-center text-text-dark dark:text-white lg:order-1">
          {isMobile ? <MenuMobileIcon /> : <MenuIcon openLabel="Pages" />}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <div className="justify-start">
            <SheetTitle>Business name</SheetTitle>
            <User user={user} />
          </div>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="bg-white dark:bg-darkmode-body overflow-y-auto w-full md:w-96 p-9 sidebar">
            <ul className="nav-list">
              {menu.map((menuItem) => (
                <li key={menuItem.url} className={cn("nav-item")}>
                  <Link
                    href={menuItem.url}
                    className={cn(
                      "nav-link block",
                      "py-2 px-3 rounded-lg transition-colors",
                    )}
                  >
                    {menuItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SheetFooter className="flex flex-col md:flex-row gap-4">
          {!user ? (
            <Link
              href={`/${locale}/auth/login`}
              prefetch={false}
              className="w-full"
            >
              <Button className="w-full" variant="outline">
                <SignInIcon className="h-5 w-5" />
                {t("login")}
              </Button>
            </Link>
          ) : (
            <>
              <SwitchApp
                className="w-full"
                application={ApplicationsNames.WEB}
                businessId={business.id}
              />
              <Logout title={t("logout")} action={logoutAction} />
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
