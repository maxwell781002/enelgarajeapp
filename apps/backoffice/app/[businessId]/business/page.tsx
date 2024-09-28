import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { businessRepository } from "@repo/model/repositories/business";
import BusinessForm from "../../../components/business-form";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { userRepository, UserRoles } from "@repo/model/repositories/user";

export default async function PageForm({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("Business");
  const business = await businessRepository.getById(businessId);
  const user = await getCurrentUser();
  const users =
    user.role === UserRoles.ADMIN ? await userRepository.getAll() : [];
  const action = async (props: any) => {
    "use server";
    const { id } = await businessRepository.update(businessId, props);
    return redirect(`/${id}`);
  };
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backBusiness")}>
      <BusinessForm
        defaultValues={business}
        action={action}
        isAdmin={user?.role === UserRoles.ADMIN}
        users={users}
      />
    </BackPage>
  );
}
