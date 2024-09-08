import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { businessRepository } from "@repo/model/repositories/business";
import BusinessForm from "./form";
import { CompleteBusiness } from "@repo/model/zod/business";

const defaultValues = {
  name: "",
  description: "",
};

export default async function PageForm() {
  const action = async (props: any) => {
    "use server";
    console.log(props);
    const { id } = await businessRepository.create(props);
    console.log(id);
    return redirect(`/${id}`);
  };
  return (
    <BackPage href="/business" urlTitle="Ir a negocios">
      <BusinessForm
        defaultValues={defaultValues as CompleteBusiness}
        action={action}
      />
    </BackPage>
  );
}
