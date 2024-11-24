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

const defaultValues = {};

export default async function PageForm({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("Business");
  const business = await businessRepository.getById(businessId);
  const telegram = await telegramBusinessRepository.getByBusinessId(businessId);
  const user = await getCurrentUser();
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
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backBusiness")}>
      <BusinessForm
        defaultValues={{
          ...defaultValues,
          ...business,
          telegram,
          userId: owner?.userId,
        }}
        paymentMethods={paymentMethods}
        action={action}
        isAdmin={user?.role === UserRoles.ADMIN}
        users={users}
      />
    </BackPage>
  );
}
