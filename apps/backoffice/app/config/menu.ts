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
  {
    link: `/admin/neighborhood`,
    title: "Repartos",
    Icon: MapPinIcon,
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
    link: `/${businessId}/payment-methods`,
    title: "Métodos de pago",
    Icon: DollarSignIcon,
    active: true,
  },
  {
    link: `/${businessId}/products`,
    title: "Productos",
    Icon: Package2,
    active: true,
  },
  {
    link: `/${businessId}/neighborhood`,
    title: "Repartos",
    Icon: MapPinIcon,
  },
  {
    link: `/${businessId}/users`,
    title: "Usuarios",
    Icon: Users2Icon,
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
