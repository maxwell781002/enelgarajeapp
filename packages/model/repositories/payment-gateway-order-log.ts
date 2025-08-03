import { Prisma } from "@repo/model/prisma/prisma-client";
import { BaseRepository } from "@repo/model/lib/base-repository";
import {
  CompletePaymentGatewayOrderLog,
  PaymentGatewayOrderLogModel,
} from "../prisma/zod";

export class PaymentGatewayOrderLogRepository extends BaseRepository<
  CompletePaymentGatewayOrderLog,
  typeof Prisma.paymentGatewayOrderLog
> {
  constructor() {
    super(
      PaymentGatewayOrderLogModel.omit({ id: true }),
      "paymentGatewayOrderLog",
    );
  }
}

export const paymentGatewayOrderLogRepository =
  new PaymentGatewayOrderLogRepository();
