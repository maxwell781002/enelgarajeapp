import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { CompleteUser } from "@repo/model/zod/user";
import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import Stats from "./stats";
import NewInvoice from "./new-invoice";

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
      <CardContent className="flex flex-col md:flex-row items-center space-x-4">
        <img
          src={user.image as string}
          referrerPolicy="no-referrer"
          alt={user.name as string}
          className="rounded-full"
        />
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Phone className="mr-2 h-4 w-4" />
            {user.phone}
          </div>
        </div>
        <Stats user={user} />
        <NewInvoice />
      </CardContent>
    </Card>
  );
}
