import BackPage from "@repo/ui/components/back-page";
import { redirect } from "next/navigation";
import { businessRepository } from "@repo/model/repositories/business";
import BusinessForm from "./form";
import { CompleteBusiness } from "@repo/model/zod/business";
import { userRepository } from "@repo/model/repositories/user";

const defaultValues = {
  name: "",
  description: "",
};

export default async function PageForm() {
  const action = async (props: any) => {
    "use server";
    const { id } = await businessRepository.create(props);
    return redirect(`/${id}`);
  };
  const users = await userRepository.getAll();
  return (
    <BackPage href="/business" urlTitle="Ir a negocios">
      <BusinessForm
        defaultValues={defaultValues as CompleteBusiness}
        action={action}
        users={users}
      />
    </BackPage>
  );
}
