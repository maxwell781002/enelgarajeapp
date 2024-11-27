import { LinkItem, MenuItem, SEPARATOR } from "@repo/ui/types/linkItem";
import {
  Package2,
  Settings,
  ShoppingBasketIcon,
  MapPinIcon,
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
  {
    link: `/${businessId}/order`,
    title: "Órdenes",
    Icon: ShoppingBasketIcon,
    active: true,
  },
  {
    link: `/${businessId}/address-user`,
    title: "Direcciones",
    Icon: MapPinIcon,
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
