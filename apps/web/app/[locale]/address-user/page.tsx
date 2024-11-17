import { userAddressRepository } from "@repo/model/repositories/user-address";
import { getCurrentUser } from "@repo/model/repository/user";
import { CompleteAddress } from "@repo/model/zod/address";
import AddressCard from "@repo/ui/components/address/card";
import { getTranslations } from "next-intl/server";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getCurrentBusiness } from "@repo/model/repository/business";
import NoAddress from "./no-address";
import { removeAddressFromUser } from "@repo/model/repository/address";

export default async function Page() {
  const user = await getCurrentUser();
  const business = await getCurrentBusiness();
  const addresses = await userAddressRepository.findByUserIdAndBusinessId(
    user.id,
    business.id,
  );
  const t = await getTranslations("Address");
  const handleDelete = async (id: string) => {
    "use server";
    await removeAddressFromUser(user.id, id);
    revalidatePath("/address-user");
  };
  if (addresses.length === 0) {
    return <NoAddress newLink="/address-user/form" />;
  }
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
            urlEdit={`/address-user/form?id=${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
