import BackPage from "@repo/ui/components/back-page";
import { getTranslations } from "next-intl/server";
import Form from "./form";
import { formDataToObject } from "@repo/model/lib/utils";
import { businessSiteRepository } from "@repo/model/repositories/business-site";
import { redirect } from "next/navigation";

const defaultValues = {
  logo: "",
  email: "",
};

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const t = await getTranslations("BusinessSite");
  const { logo, ...site } = (await businessSiteRepository.getByBusinessId(
    businessId,
  )) || { ...defaultValues, businessId };
  const action = async (formData: FormData) => {
    "use server";
    const obj = formDataToObject(formData) as any;
    obj.businessId = businessId;
    if (site.id) {
      await businessSiteRepository.update(site?.id, obj);
    } else {
      await businessSiteRepository.create(obj);
    }
    return redirect(`/${businessId}/site`);
  };
  return (
    <div className="container mx-auto p-4 space-y-6">
      <BackPage href={`/${businessId}/site`} urlTitle={t("backSite")}>
        <Form action={action} defaultValues={site} />
      </BackPage>
    </div>
  );
}
