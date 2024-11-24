import { PaymentMethodType } from "@repo/model/validation/payment-method";
import EnzonaForm from "./enzona";
import TransfermovilForm from "./transfermovil";

export const ComponentByType = {
  [PaymentMethodType.ENZONA]: EnzonaForm,
  [PaymentMethodType.TRANSFERMOVIL]: TransfermovilForm,
};
