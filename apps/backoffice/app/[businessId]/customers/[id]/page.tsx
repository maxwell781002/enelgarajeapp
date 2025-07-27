import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { userRepository } from "@repo/model/repositories/user";
import BackPage from "@repo/ui/components/back-page";

export default async function Page({
  params,
}: {
  params: { id: string; businessId: string };
}) {
  const { id, businessId } = await params;
  const t = await getTranslations("Customers");
  const user = await userRepository.getById(id);
  return (
    <BackPage href={`/${businessId}/customers`} urlTitle={t("backCustomers")}>
      <Card>
        <CardHeader>
          <CardTitle>{t("DetailTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex sm:flex-row mb-4 flex-col sm:justify-between w-full">
            <div className="flex space-x-4">
              <img
                src={user.image as string}
                referrerPolicy="no-referrer"
                alt={user.name as string}
                className="rounded-full"
              />
              <div className="mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {/* <UserIcon userType={user._userType as TUserBusinessType} /> */}
                  {user.name}
                </h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-2 h-4 w-4" />
                  {user.phone}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </BackPage>
  );
}
