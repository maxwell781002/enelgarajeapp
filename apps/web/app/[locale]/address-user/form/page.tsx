import { CompleteAddress } from "@repo/model/zod/address";
import BackPage from "@repo/ui/components/back-page";
import AddressUserForm from "./form";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { getTranslations } from "next-intl/server";
import { addAddressToUser, getCurrentUser } from "@repo/model/repository/user";
import { redirect } from "next/navigation";
import { formDataToObject } from "@repo/model/lib/utils";

export default async function AddressUserFormPage() {
  const t = await getTranslations("Address");
  const business = await getCurrentBusiness();
  const userEntity = await getCurrentUser();
  const action = async (data: FormData) => {
    "use server";
    await addAddressToUser(userEntity.id, formDataToObject(data));
    return redirect("/address-user");
  };
  return (
    <BackPage href="/address-user" urlTitle={t("back-address")}>
      <AddressUserForm
        action={action}
        defaultValues={{} as CompleteAddress}
        business={business?.id}
      />
    </BackPage>
  );
}
