import { LinkItem, MenuItem, SEPARATOR } from "@repo/ui/types/linkItem";
import {
  Home,
  Package2,
  Settings,
  TagsIcon,
  ShoppingBasketIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";

export const coreMenu: LinkItem[] = [
  {
    link: `/admin/dashboard`,
    title: "Dashboard",
    Icon: Home,
  },
  {
    link: `/admin/business`,
    title: "Negocios",
    Icon: BriefcaseBusinessIcon,
  },
];

export const businessMenu: (businessId: string) => LinkItem[] = (
  businessId: string,
) => [
  {
    link: `/${businessId}`,
    title: "Dashboard",
    Icon: Home,
  },
  {
    link: `/${businessId}/orders`,
    title: "Ordenes",
    Icon: ShoppingBasketIcon,
    active: true,
  },
  {
    link: `/${businessId}/categories`,
    title: "Categorías",
    Icon: TagsIcon,
    active: true,
  },
  {
    link: `/${businessId}/products`,
    title: "Productos",
    Icon: Package2,
    active: true,
  },
];

export const secondaryMenu: LinkItem[] = [
  {
    link: "/",
    title: "Settings",
    Icon: Settings,
  },
];

export const profileMenu: MenuItem[] = [
  // SEPARATOR,
  // {
  //   title: "Logout",
  //   link: "/auth/logout",
  // },
];
