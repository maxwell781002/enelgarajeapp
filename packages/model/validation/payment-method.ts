import { z } from "zod";
import { PaymentMethodType } from "../prisma/generated/client";
import { PaymentMethodModel } from "../prisma/zod";
import { phoneSchema } from "@repo/model/validation/general";

export { PaymentMethodType };

const Transfermovil = z.object({
  cardNumber: z.string().min(1, { message: "required" }),
  phone: phoneSchema,
});

const Enzona = z.object({
  accountId: z.string().min(1, { message: "required" }),
});

export const PaymentMethodValidationByType = {
  [PaymentMethodType.TRANSFERMOVIL]: Transfermovil,
  [PaymentMethodType.ENZONA]: Enzona,
};

export const getValidation = (type: PaymentMethodType | null = null) => {
  let validation: any = PaymentMethodModel.omit({ id: true });
  if (type) {
    validation = validation.extend({
      data: PaymentMethodValidationByType[type],
    });
  }
  return validation;
};
