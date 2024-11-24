import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { CompleteBusiness } from "@repo/model/zod/business";
import { userRepository } from "@repo/model/repositories/user";
import BusinessForm from "../../../../components/business-form/index";
import { createOrUpdateBusiness } from "@repo/model/repository/business";
import { formDataToObject } from "@repo/model/lib/utils";
import { DEFAULT_PLAN } from "@repo/model/lib/plans-feature";

const defaultValues = {
  name: "",
  description: "",
  active: true,
  plan: DEFAULT_PLAN,
  sendOrderToWhatsapp: false,
  requestAddress: false,
};

export default async function PageForm() {
  const action = async (props: any) => {
    "use server";
    const obj = formDataToObject(props) as CompleteBusiness;
    const { id } = await createOrUpdateBusiness(obj);
    return redirect(`/${id}`);
  };
  const users = await userRepository.getAll();
  return (
    <BackPage href="/admin/business" urlTitle="Ir a negocios">
      <BusinessForm
        defaultValues={defaultValues as CompleteBusiness}
        action={action}
        users={users}
        isAdmin={true}
      />
    </BackPage>
  );
}
