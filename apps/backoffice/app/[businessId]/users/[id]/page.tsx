import { userRepository } from "@repo/model/repositories/user";
import UserProfile from "./general/index";
import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import CardBank from "./card-bank";

export type PageProps = {
  params: {
    businessId: string;
    id: string;
  };
};

export default async function Page({ params: { id, businessId } }: PageProps) {
  const user = await userRepository.getById(id);
  const t = await getTranslations("UserDetail");
  return (
    <BackPage href={`/${businessId}/users`} urlTitle={t("backUsers")}>
      <div className="space-y-2">
        <UserProfile user={user} />
        {/* TODO Add it before */}
        {/* <Stats /> */}
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">{t("tabOrders")}</TabsTrigger>
            <TabsTrigger value="cardNumbers">{t("tabCardNumbers")}</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">{t("tabOrders")}</TabsContent>
          <TabsContent value="cardNumbers">
            <CardBank businessId={businessId} collaboratorId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </BackPage>
  );
}
