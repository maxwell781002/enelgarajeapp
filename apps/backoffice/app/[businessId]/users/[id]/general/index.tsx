import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { CompleteUser } from "@repo/model/zod/user";
import { getTranslations } from "next-intl/server";

interface UserProfileProps {
  user: CompleteUser;
}

export default async function UserProfile({ user }: UserProfileProps) {
  const t = await getTranslations("UserDetail");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <img
          src={user.image as string}
          referrerPolicy="no-referrer"
          alt={user.name as string}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
