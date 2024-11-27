import { userAddressRepository } from "@repo/model/repositories/user-address";
import { getCurrentUser } from "@repo/model/repository/user";
import { CompleteAddress } from "@repo/model/zod/address";
import AddressCard from "@repo/ui/components/address/card";
import { getTranslations } from "next-intl/server";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import NoAddress from "./no-address";
import { removeAddressFromUser } from "@repo/model/repository/address";
import { CompleteBusiness } from "@repo/model/zod/business";

export type AddressUserPageProps = {
  business: CompleteBusiness;
  isCollaborator?: boolean;
  baseUrl?: string;
};

export default async function AddressUserPage({
  business,
  isCollaborator = false,
  baseUrl = "",
}: AddressUserPageProps) {
  const user = await getCurrentUser();
  const addresses = await userAddressRepository.findByUserIdAndBusinessId(
    user.id,
    business.id as string,
    isCollaborator,
  );
  const t = await getTranslations("Address");
  const handleDelete = async (id: string) => {
    "use server";
    await removeAddressFromUser(user.id, id);
    revalidatePath("/address-user");
  };
  if (addresses.length === 0) {
    return <NoAddress newLink={`${baseUrl}/address-user/form`} />;
  }
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href={`${baseUrl}/address-user/form`}>
            {t("btn_add_new_address")}
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((item: CompleteAddress) => (
          <AddressCard
            key={item.id}
            address={item}
            onDelete={handleDelete.bind(null, item.id)}
            urlEdit={`${baseUrl}/address-user/form?id=${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
