import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { businessRepository } from "@repo/model/repositories/business";
import BusinessForm from "../../../components/business-form/index";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { userRepository, UserRoles } from "@repo/model/repositories/user";
import { formDataToObject } from "@repo/model/lib/utils";
import { CompleteBusiness } from "@repo/model/zod/business";
import { createOrUpdateBusiness } from "@repo/model/repository/business";
import { telegramBusinessRepository } from "@repo/model/repositories/telegram-business";
import { paymentMethodRepository } from "@repo/model/repositories/payment-method";
import { SecurityUser } from "@repo/model/lib/auth";

const defaultValues = {
  whatsappGroupChatId: "",
};

export default async function PageForm({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const t = await getTranslations("Business");
  const business = await businessRepository.getById(businessId);
  const telegram = await telegramBusinessRepository.getByBusinessId(businessId);
  const user = (await getCurrentUser()) as SecurityUser;
  const owner = await businessRepository.getOwner(businessId);
  const users =
    user.role === UserRoles.ADMIN ? await userRepository.getAll() : [];
  const action = async (props: any) => {
    "use server";
    const obj = formDataToObject(props) as CompleteBusiness;
    const { id } = await createOrUpdateBusiness(obj, businessId);
    return redirect(`/${id}`);
  };
  const paymentMethods = await paymentMethodRepository.getAll(businessId);
  const data = {
    ...defaultValues,
    ...business,
    telegram,
    userId: owner?.userId,
  };
  if (business.whatsappGroupChatId === null) {
    data.whatsappGroupChatId = "";
  }
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backBusiness")}>
      <BusinessForm
        defaultValues={data}
        paymentMethods={paymentMethods}
        action={action}
        isAdmin={user?.role === UserRoles.ADMIN}
        users={users}
      />
    </BackPage>
  );
}
