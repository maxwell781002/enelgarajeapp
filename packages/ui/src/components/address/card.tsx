import { CompleteAddress } from "@repo/model/zod/address";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Check } from "lucide-react";
import { getCityByCode } from "@repo/ui/lib/locations/index";
import { getStateByCode } from "@repo/ui/lib/locations/index";

export type AddressCardProps = {
  address: CompleteAddress;
  selected?: boolean;
};

export default function AddressCard({ address, selected }: AddressCardProps) {
  return (
    <Card className="border-2 transition-all peer-checked:border-primary">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{address.alias}</h3>
            <p className="text-sm text-muted-foreground">{address.name}</p>
            <p className="text-sm text-muted-foreground">{address.address}</p>
            <p className="text-sm text-muted-foreground">
              {!!address.neighborhood && `${address.neighborhood?.name},`}
              {getCityByCode(address.city)?.name},{" "}
              {getStateByCode(address.state)?.name}
            </p>
            <p className="text-sm text-muted-foreground">{address.reference}</p>
          </div>
          {selected && <Check className="text-primary" />}
        </div>
      </CardContent>
    </Card>
  );
}
