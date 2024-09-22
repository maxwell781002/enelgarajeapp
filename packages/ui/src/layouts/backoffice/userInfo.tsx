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
import Link from "next/link";
import Logout from "./logout";
import { signOut } from "@repo/model/lib/auth";
import { redirect } from "next/navigation";

export type UserInfoProps = {
  userImage: string;
  userMenuItems: MenuItem[];
};

export default function UserInfo({ userImage, userMenuItems }: UserInfoProps) {
  const handleSignOut = async () => {
    "use server";
    await signOut();
    return redirect("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <img
            src={userImage}
            referrerPolicy="no-referrer"
            alt={"user name"}
            className="aspect-square rounded-md object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {userMenuItems.map((item, i) => (
          <Fragment key={i}>
            {item === SEPARATOR ? (
              <DropdownMenuSeparator />
            ) : (
              <DropdownMenuItem>
                <Link href={item.link}>{item.title}</Link>
              </DropdownMenuItem>
            )}
          </Fragment>
        ))}
        <DropdownMenuSeparator />
        <Logout signOut={handleSignOut} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
