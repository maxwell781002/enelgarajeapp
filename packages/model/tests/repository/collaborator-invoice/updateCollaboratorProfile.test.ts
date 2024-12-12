import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  collaboratorInvoiceFactory,
  orderFactory,
  userBusinessFactory,
  userFactory,
} from "../../factories";
import { Currency, UserBusinessType } from "../../../types/enums";
import { updateCollaboratorProfile } from "../../../repository/collaborator-invoice";
import { OrderStatus } from "../../../prisma/generated/client";
import { collaboratorProfileRepository } from "../../../repositories/collaborator-profile";

// Test
// The two collaborators will have 3 orders
// The collaborator 1 will have 2 invoices one of them confirmed
// The collaborator 1 will confirm another invoice

const createOrder = async (
  business,
  collaborator,
  commission,
  businessProfit,
  hasInvoice = false,
  confirmed = false,
  status: OrderStatus = OrderStatus.SEND,
) => {
  const orderData = {
    status,
    businessId: business.id,
    userId: collaborator.id,
    commission,
    businessProfit,
    isCollaborator: true,
  };
  if (hasInvoice) {
    const data: any = {
      confirmed,
      businessId: business.id,
      collaboratorId: collaborator.id,
      amount: 100,
      currency: Currency.CUP,
      transferCode: "transferCode",
    };
    const invoice = await collaboratorInvoiceFactory(data);
    orderData["collaboratorInvoiceId"] = invoice.id;
  }
  return orderFactory(orderData);
};

describe("updateCollaboratorProfile", () => {
  let business;
  let user;
  beforeAll(async () => {
    business = await businessFactory();
    user = await userFactory();
    await userBusinessFactory({
      userId: user.id,
      businessId: business.id,
      type: UserBusinessType.COLLABORATOR,
    });

    //User 1
    await createOrder(business, user, 30, 70);
    await createOrder(business, user, 10, 50, true, true);
    await createOrder(business, user, 5, 85, true, true);
    await createOrder(business, user, 20, 60, true);
    await createOrder(business, user, 20, 60, true);
    await createOrder(business, user, 20, 60, false, false, OrderStatus.PAYED);
    await createOrder(business, user, 20, 60, false, false, OrderStatus.PAYED);
  });

  afterAll(async () => {
    await clearBd();
  });

  it("updateCollaboratorProfile", async () => {
    const { id } = await updateCollaboratorProfile(user.id, business.id);
    const profile = await collaboratorProfileRepository.getById(id);
    const {
      historicalProfit,
      totalBusinessProfit,
      totalPendingInvoiceToConfirm,
      totalOrderForPayment,
    } = profile;
    expect(historicalProfit).toBe(10 + 5);
    expect(totalBusinessProfit).toBe(50 + 85);
    expect(totalPendingInvoiceToConfirm).toBe(2);
    expect(totalOrderForPayment).toBe(2);
  });
});
