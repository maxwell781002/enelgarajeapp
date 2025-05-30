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
import OrdersContext from "./orders/context";
import { UserBusinessType } from "@repo/model/types/enums";

export type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{
    businessId: string;
    id: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { id, businessId } = await params;
  searchParams = await searchParams;
  const user = await userRepository.getUserWithCollaboratorProfile(
    id,
    businessId,
  );
  console.log(user);
  const t = await getTranslations("UserDetail");
  return (
    <OrdersContext>
      <BackPage href={`/${businessId}/users`} urlTitle={t("backUsers")}>
        <div className="space-y-2">
          <UserProfile user={user} businessId={businessId} />
          {user._userType === UserBusinessType.COLLABORATOR && (
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="orders">{t("tabOrders")}</TabsTrigger>
                <TabsTrigger value="invoices">{t("tabInvoices")}</TabsTrigger>
                <TabsTrigger value="cardNumbers">
                  {t("tabCardNumbers")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <CollaboratorOrders
                  businessId={businessId}
                  collaboratorId={id}
                />
              </TabsContent>
              <TabsContent value="invoices">
                <CollaboratorInvoice
                  businessId={businessId}
                  collaboratorId={id}
                  searchParams={searchParams}
                />
              </TabsContent>
              <TabsContent value="cardNumbers">
                <CardBank
                  businessId={businessId}
                  collaboratorId={id}
                  user={user}
                />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </BackPage>
    </OrdersContext>
  );
}
