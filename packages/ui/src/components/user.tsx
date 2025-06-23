import { SecurityUser } from "@repo/model/lib/auth";
import { UserIcon } from "@repo/ui/components/icons";
import { cn } from "../lib/utils";
import Link from "next/link";

export type UserProps = {
  user?: SecurityUser;
  onlyIcon?: boolean;
  size?: string;
}

export default function User({user, onlyIcon, size = "h-10 w-10"}: UserProps) {
  if (!user) {
    return (
      <Link
        href={'/auth/login'}
        prefetch={false}
        className="w-full"
      >
        <UserIcon />
      </Link>
    )
  }
  return (
    <div className="flex items-center gap-2">
      <img
        src={user.image as string}
        referrerPolicy="no-referrer"
        alt={"user name"}
        className={cn("aspect-square rounded-md object-cover", size)}
      />
      {!onlyIcon && user?.name}
    </div>
  )
}
