export type LinkItem = {
  Icon?: any;
  title: string;
  link: string;
  active?: boolean;
};

export const SEPARATOR = "separator";

export type MenuItem = LinkItem | typeof SEPARATOR;

export type LinkItemsProps = {
  menuItems: LinkItem[];
};
