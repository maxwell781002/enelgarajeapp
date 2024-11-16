import { userAddressRepository } from "@repo/model/repositories/user-address";
import { getCurrentUser } from "@repo/model/repository/user";
import { CompleteAddress } from "@repo/model/zod/address";
import AddressCard from "@repo/ui/components/address/card";

export default async function Page() {
  const user = await getCurrentUser();
  const addresses = await userAddressRepository.findByUserId(user.id);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {addresses.map((item) => (
        <AddressCard key={item.id} address={item as CompleteAddress} />
      ))}
    </div>
  );
}
