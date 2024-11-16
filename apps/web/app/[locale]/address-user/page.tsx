import { userAddressRepository } from "@repo/model/repositories/user-address";
import {
  getCurrentUser,
  removeAddressFromUser,
} from "@repo/model/repository/user";
import { CompleteAddress } from "@repo/model/zod/address";
import AddressCard from "@repo/ui/components/address/card";
import { getTranslations } from "next-intl/server";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const user = await getCurrentUser();
  const addresses = await userAddressRepository.findByUserId(user.id);
  const t = await getTranslations("Address");
  const handleDelete = async (id: string) => {
    "use server";
    await removeAddressFromUser(user.id, id);
    revalidatePath("/address-user");
  };
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href={"/address-user/form"}>{t("btn_add_new_address")}</Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((item) => (
          <AddressCard
            key={item.id}
            address={item as CompleteAddress}
            onDelete={handleDelete.bind(null, item.id)}
          />
        ))}
      </div>
    </div>
  );
}
