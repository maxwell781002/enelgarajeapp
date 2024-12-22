import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddressType,
  addressValidation,
  TUserRegisterSchema,
  UserRegisterSchema,
} from "@repo/model/validation/user";
import { CompleteAddress } from "@repo/model/zod/address";
import { CompleteBusiness } from "@repo/model/zod/business";
import { useState } from "react";
import { useForm } from "react-hook-form";

const defaultAddress: Omit<CompleteAddress, "id"> = {
  alias: "",
  name: "",
  address: "",
  city: "",
  state: "",
  reference: "",
  neighborhoodId: null,
};

export const useCheckoutForm = (
  user: TUserRegisterSchema,
  business: CompleteBusiness,
  addressType: AddressType,
  action: (data: TUserRegisterSchema) => Promise<any>,
) => {
  const [shopCartHasError, setShopCartHasError] = useState(false);
  const schema = business.requestAddress
    ? UserRegisterSchema.extend({
        [addressType]: addressValidation[addressType],
      })
    : UserRegisterSchema;

  const form = useForm<TUserRegisterSchema>({
    resolver: zodResolver(schema),
    defaultValues: business.requestAddress
      ? ({ ...user, [AddressType.newAddress]: defaultAddress } as any)
      : user,
  });
  const handleAction = async (data: TUserRegisterSchema) => {
    try {
      await action({ ...data, addressType });
    } catch (error: any) {
      if (error.message === "out_of_stock") {
        setShopCartHasError(true);
      }
    }
  };
  return { form, handleAction, shopCartHasError };
};
