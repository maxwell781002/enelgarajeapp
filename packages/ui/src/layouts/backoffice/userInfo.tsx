import { Fragment } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MenuItem, SEPARATOR } from "../../types/linkItem";

export type UserInfoProps = {
  userImage: string;
  userMenuItems: MenuItem[];
};

export default function UserInfo({ userImage, userMenuItems }: UserInfoProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={userImage}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {userMenuItems.map((item, i) => (
          <Fragment key={i}>
            {item === SEPARATOR ? (
              <DropdownMenuSeparator />
            ) : (
              <DropdownMenuItem>{item.title}</DropdownMenuItem>
            )}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
