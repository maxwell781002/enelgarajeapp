import { LinkItem, MenuItem, SEPARATOR } from "@repo/ui/types/linkItem";
import {
  Home,
  LayoutTemplate,
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
    active: true,
  },
  {
    link: `/${businessId}/site`,
    title: "Sitio web",
    Icon: LayoutTemplate,
    active: true,
  },
  {
    link: `/${businessId}/orders`,
    title: "Órdenes",
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
    active: true,
  },
  {
    link: `/${businessId}/users`,
    title: "Gestores",
    Icon: Users2Icon,
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
