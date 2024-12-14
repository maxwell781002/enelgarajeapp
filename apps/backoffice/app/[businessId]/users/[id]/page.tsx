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
import CollaboratorOrders from "./orders";
import CollaboratorInvoice from "./invoices";

export type PageProps = {
  searchParams: any;
  params: {
    businessId: string;
    id: string;
  };
};

export default async function Page({
  searchParams,
  params: { id, businessId },
}: PageProps) {
  const user = await userRepository.getUserWithCollaboratorProfile(
    id,
    businessId,
  );
  const t = await getTranslations("UserDetail");
  return (
    <BackPage href={`/${businessId}/users`} urlTitle={t("backUsers")}>
      <div className="space-y-2">
        <UserProfile user={user} businessId={businessId} />
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">{t("tabOrders")}</TabsTrigger>
            <TabsTrigger value="invoices">{t("tabInvoices")}</TabsTrigger>
            <TabsTrigger value="cardNumbers">{t("tabCardNumbers")}</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <CollaboratorOrders
              businessId={businessId}
              collaboratorId={id}
              searchParams={searchParams}
            />
          </TabsContent>
          <TabsContent value="invoices">
            <CollaboratorInvoice businessId={businessId} collaboratorId={id} />
          </TabsContent>
          <TabsContent value="cardNumbers">
            <CardBank businessId={businessId} collaboratorId={id} user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </BackPage>
  );
}
