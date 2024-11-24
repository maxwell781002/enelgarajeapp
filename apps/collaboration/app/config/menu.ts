import { LinkItem, MenuItem, SEPARATOR } from "@repo/ui/types/linkItem";
import {
  Home,
  Package2,
  Settings,
  TagsIcon,
  DollarSignIcon,
  ShoppingBasketIcon,
  BriefcaseBusinessIcon,
  MapPinIcon,
  Users2Icon,
} from "lucide-react";

export const businessMenu: (businessId: string) => LinkItem[] = (
  businessId: string,
) => [
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
