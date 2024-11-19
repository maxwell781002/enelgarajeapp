import { zodResolver } from "@hookform/resolvers/zod";
import { getNeighborhoodsByCityAndBusiness } from "@repo/model/api/neighborhood";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { ShopCartOrder } from "@repo/model/types/shop-cart";
import {
  AddressType,
  addressValidation,
  TUserRegisterSchema,
  UserRegisterSchema,
} from "@repo/model/validation/user";
import { CompleteAddress } from "@repo/model/zod/address";
import { CompleteBusiness } from "@repo/model/zod/business";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export const useNeighborhoods = (
  city: string,
  business: string,
  neighborhoodId: string,
  form: any,
) => {
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithShipping[]
  >([]);
  useEffect(() => {
    if (city && business) {
      form.resetField(`${AddressType.newAddress}.neighborhoodId`);
      getNeighborhoodsByCityAndBusiness(city, business).then((data) => {
        setNeighborhoods(data);
      });
    }
  }, [city, business]);
  const currentNeighborhood = neighborhoods.find(
    (neighborhood) => neighborhood.id === neighborhoodId,
  );
  return { neighborhoods, currentNeighborhood };
};

export const useCurrentAddress = (form: any, addressType: AddressType) => {
  const {
    [AddressType.selectAddress]: addressSelected,
    [AddressType.newAddress]: addressNew,
  } = form.watch();
  return useMemo(() => {
    const address =
      addressType === AddressType.selectAddress ? addressSelected : addressNew;
    return address || {};
  }, [addressType, addressSelected, addressNew]);
};

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
  order: ShopCartOrder,
  action: (data: TUserRegisterSchema) => Promise<any>,
) => {
  const [shopCartHasError, setShopCartHasError] = useState(
    order?.hasProductOutOfStock,
  );
  const schema = useMemo(
    () =>
      business.requestAddress
        ? UserRegisterSchema.extend({
            [addressType]: addressValidation[addressType],
          })
        : UserRegisterSchema,
    [addressType],
  );
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
