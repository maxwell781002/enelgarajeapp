import { HousePlugIcon, PanelLeft } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import Menu, { MenuProps } from "./menu";
import { LinkItem } from "@repo/ui/types/linkItem";
import UserInfo, { UserInfoProps } from "./userInfo";
import Breadcrumb, { BreadcrumbProps } from "./breadcrumb";
import BusinessSwitch, { BusinessSwitchProps, Item } from "./business.switch";
import Link from "next/link";

type MainProps = {
  children: React.ReactNode;
  secondaryMenu?: LinkItem[];
  adminUrl?: string;
  business?: Item[];
} & Omit<MenuProps, "showTitle"> &
  UserInfoProps &
  Omit<BreadcrumbProps, "className"> &
  Omit<BusinessSwitchProps, "business">;

export function LayoutMain({
  children,
  secondaryMenu,
  business,
  adminUrl,
  ...props
}: MainProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Menu {...props} />
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          {!!secondaryMenu && <Menu menuItems={secondaryMenu} />}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Menu {...props} showTitle />
              </nav>
            </SheetContent>
          </Sheet>
          {!!business && <BusinessSwitch {...props} business={business} />}
          {!!adminUrl && (
            <Link href={adminUrl}>
              <HousePlugIcon />
            </Link>
          )}
          <div className="flex-1 flex justify-end sm:justify-between">
            <Breadcrumb {...props} className="hidden md:flex" />
            <UserInfo {...props} />
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}
