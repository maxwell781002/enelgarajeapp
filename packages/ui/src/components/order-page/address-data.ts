import { getTranslations } from "next-intl/server";
import { CompleteOrder } from "@repo/model/zod/order";
import { getCityByCode, getStateByCode } from "@repo/model/lib/locations/index";

export const getAddressData = async (order: CompleteOrder) => {
  const t = await getTranslations("OrderDetailBack");
  const address = order.orderAddress?.address;
  return address
    ? [
        {
          label: t("address"),
          value: address.address,
        },
        {
          label: t("neighborhood"),
          value: address.neighborhood?.name,
        },
        {
          label: t("city"),
          value: getCityByCode(address.city)?.name,
        },
        {
          label: t("state"),
          value: getStateByCode(address.state)?.name,
        },
        {
          label: t("reference"),
          value: address.reference,
        },
      ]
    : [];
};
