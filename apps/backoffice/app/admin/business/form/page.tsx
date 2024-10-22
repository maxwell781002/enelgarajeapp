import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { CompleteBusiness } from "@repo/model/zod/business";
import { userRepository } from "@repo/model/repositories/user";
import BusinessForm from "../../../../components/business-form";
import { createOrUpdateBusiness } from "@repo/model/repository/business";
import { formDataToObject } from "@repo/model/lib/utils";

const defaultValues = {
  name: "",
  description: "",
  active: true,
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
    <BackPage href="/business" urlTitle="Ir a negocios">
      <BusinessForm
        defaultValues={defaultValues as CompleteBusiness}
        action={action}
        users={users}
        isAdmin={true}
      />
    </BackPage>
  );
}
