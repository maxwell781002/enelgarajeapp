import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { businessRepository } from "@repo/model/repositories/business";
import BusinessForm from "../../../components/business-form";
import { getTranslations } from "next-intl/server";

export default async function PageForm({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("Business");
  const business = await businessRepository.getById(businessId);
  const action = async (props: any) => {
    "use server";
    const { id } = await businessRepository.update(businessId, props);
    return redirect(`/${id}`);
  };
  return (
    <BackPage href={`/${businessId}`} urlTitle={t("backBusiness")}>
      <BusinessForm defaultValues={business} action={action} />
    </BackPage>
  );
}
