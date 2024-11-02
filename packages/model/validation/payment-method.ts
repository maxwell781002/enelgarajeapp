import { z } from "zod";
import { PaymentMethodType } from "../prisma/generated/client";

export { PaymentMethodType };

const Transfermovil = z.object({
  cardNumber: z.string(),
  phone: z.string(),
});

const Enzona = z.object({
  cardNumber: z.string(),
  phone: z.string(),
});

export const PaymentMethodValidationByType = {
  [PaymentMethodType.TRANSFERMOVIL]: Transfermovil,
  [PaymentMethodType.ENZONA]: Enzona,
};
