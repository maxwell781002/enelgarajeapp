"use client";

import { CompleteAddress } from "@repo/model/zod/address";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Check, Edit2Icon } from "lucide-react";
import { getCityByCode } from "@repo/ui/lib/locations/index";
import { getStateByCode } from "@repo/ui/lib/locations/index";
import { BtnRemove } from "@repo/ui/components/ui/btn-remove";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export type AddressCardProps = {
  address: CompleteAddress;
  selected?: boolean;
  onDelete?: () => Promise<void>;
  urlEdit?: string;
};

export default function AddressCard({
  address,
  selected,
  onDelete,
  urlEdit,
}: AddressCardProps) {
  const t = useTranslations("Address");
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const handleDelete = async () => {
    setDeleteDisabled(true);
    await onDelete?.();
  };
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
          <div className="flex items-center">
            {!!urlEdit && (
              <Button size={"icon"} asChild className="mr-2">
                <Link href={urlEdit}>
                  <Edit2Icon className="w-4 h-4" />
                </Link>
              </Button>
            )}
            {onDelete && (
              <BtnRemove
                action={handleDelete}
                entityId={address.id}
                title={t("removeAddress")}
                description={t("removeAddressDescription")}
                btnContinueText={t("removeAddressContinue")}
                btnCancelText={t("removeAddressCancel")}
                btnAttr={{ disabled: deleteDisabled }}
              />
            )}
          </div>
          {selected && <Check className="text-primary" />}
        </div>
      </CardContent>
    </Card>
  );
}
