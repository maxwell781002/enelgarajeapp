import { CompleteAddress } from "@repo/model/zod/address";
import BackPage from "@repo/ui/components/back-page";
import AddressUserForm from "./form";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { redirect } from "next/navigation";
import { formDataToObject } from "@repo/model/lib/utils";
import { addressRepository } from "@repo/model/repositories/address";
import {
  addAddressToUser,
  updateUserAddress,
} from "@repo/model/repository/address";

export default async function AddressUserFormPage({
  searchParams: { id },
}: any) {
  const t = await getTranslations("Address");
  const business = await getCurrentBusiness();
  const userEntity = await getCurrentUser();
  const action = async (data: FormData) => {
    "use server";
    if (id) {
      await updateUserAddress(userEntity.id, id, formDataToObject(data));
    } else {
      await addAddressToUser(
        userEntity.id,
        business.id,
        formDataToObject(data),
      );
    }
    return redirect("/address-user");
  };
  const defaultValues = id ? await addressRepository.get(id) : {};
  return (
    <BackPage href="/address-user" urlTitle={t("back-address")}>
      <AddressUserForm
        action={action}
        defaultValues={defaultValues as CompleteAddress}
        business={business?.id}
      />
    </BackPage>
  );
}
