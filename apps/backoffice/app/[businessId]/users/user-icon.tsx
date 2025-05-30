import { Megaphone, Truck } from "lucide-react";
import { UserBusinessType, TUserBusinessType } from "@repo/model/types/enums";

export default function UserIcon({
  userType,
}: {
  userType: TUserBusinessType;
}) {
  return userType === UserBusinessType.MESSENGER ? <Truck /> : <Megaphone />;
}
