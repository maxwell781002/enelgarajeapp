import Link from "next/link";
import { LinkItemsProps } from "@repo/ui/types/linkItem";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";

const activeItem = "flex items-center gap-4 px-2.5 text-foreground";
const defaultClass =
  "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";

export type MenuProps = {
  showTitle?: boolean;
} & LinkItemsProps;

export default function Menu({ showTitle, menuItems }: MenuProps) {
  return (
    <>
      {menuItems.map(({ Icon, title, link, active }) => (
        <Tooltip key={link}>
          <TooltipTrigger asChild>
            <Link href={link} className={active ? activeItem : defaultClass}>
              <Icon className="h-5 w-5" />
              {showTitle ? title : <span className="sr-only">{title}</span>}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      ))}
    </>
  );
}
