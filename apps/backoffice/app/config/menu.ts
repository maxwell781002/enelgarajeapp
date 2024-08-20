import { LinkItem, MenuItem, SEPARATOR } from "@repo/ui/types/linkItem";
import { Home, Package2, Settings } from "lucide-react";

export const mainMenu: LinkItem[] = [
  {
    link: "/",
    title: "Dashboard",
    Icon: Home,
  },
  {
    link: "/post",
    title: "Acme Inc",
    Icon: Package2,
    active: true,
  },
]

export const secondaryMenu: LinkItem[] = [
  {
    link: "/",
    title: "Settings",
    Icon: Settings,
  },
]

export const profileMenu: MenuItem[] = [
  {
    title: 'My Account',
    link: '/'
  },
  SEPARATOR,
  {
    title: 'Settings',
    link: '/'
  },
  {
    title: 'Support',
    link: '/'
  },
  SEPARATOR,
  {
    title: 'Logout',
    link: '/'
  },
]