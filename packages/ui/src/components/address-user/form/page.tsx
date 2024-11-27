import { CompleteAddress } from "@repo/model/zod/address";
import BackPage from "@repo/ui/components/back-page";
import AddressUserForm from "./form";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@repo/model/repository/user";
import { redirect } from "next/navigation";
import { formDataToObject } from "@repo/model/lib/utils";
import { addressRepository } from "@repo/model/repositories/address";
import {
  addAddressToUser,
  updateUserAddress,
} from "@repo/model/repository/address";
import { CompleteBusiness } from "@repo/model/zod/business";

export type AddressUserFormPageProps = {
  business: CompleteBusiness;
  id?: string;
  isCollaborator?: boolean;
  baseUrl?: string;
};

export default async function AddressUserFormPage({
  business,
  id,
  isCollaborator = false,
  baseUrl = "",
}: AddressUserFormPageProps) {
  const t = await getTranslations("Address");
  const userEntity = await getCurrentUser();
  const action = async (data: FormData) => {
    "use server";
    if (id) {
      await updateUserAddress(userEntity.id, id, formDataToObject(data));
    } else {
      await addAddressToUser(
        userEntity.id,
        business.id as string,
        formDataToObject(data),
        isCollaborator,
      );
    }
    return redirect(`${baseUrl}/address-user`);
  };
  const defaultValues = id ? await addressRepository.get(id) : {};
  console.log(defaultValues, id);
  return (
    <BackPage href={`${baseUrl}/address-user`} urlTitle={t("back-address")}>
      <AddressUserForm
        action={action}
        defaultValues={defaultValues as CompleteAddress}
        business={business?.id}
      />
    </BackPage>
  );
}
