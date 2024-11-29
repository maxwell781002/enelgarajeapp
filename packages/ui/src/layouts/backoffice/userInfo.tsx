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
import SwitchApp from "@repo/ui/components/switch-app";
import { ApplicationsNames } from "@repo/model/lib/applications-names";

export type UserInfoProps = {
  userImage: string;
  userMenuItems: MenuItem[];
  businessId?: string;
  switchApp?: boolean;
};

export default function UserInfo({
  userImage,
  userMenuItems,
  businessId,
  switchApp,
}: UserInfoProps) {
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
        {switchApp && !!businessId && (
          <DropdownMenuItem>
            <SwitchApp
              application={ApplicationsNames.COLLABORATOR}
              className="mr-4"
              businessId={businessId}
            />
          </DropdownMenuItem>
        )}
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
