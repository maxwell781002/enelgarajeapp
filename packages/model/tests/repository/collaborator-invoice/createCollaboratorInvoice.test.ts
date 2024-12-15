import prisma from "../../../prisma/prisma-client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  collaboratorCardBankFactory,
  orderFactory,
  userFactory,
} from "../../factories";
import { confirmInvoice, createCollaboratorInvoice } from "../../../repository/collaborator-invoice";
import { orderRepository } from "../../../repositories/order";
import { OrderStatus } from "../../../prisma/generated/client";

describe.only("createCollaboratorInvoice", () => {
  let business;
  let order1;
  let order2;
  let order3;
  let user;
  let cardBank;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    order1 = await orderFactory({
      userId: user.id,
      businessId: business.id,
      commission: 10,
      businessProfit: 90,
      isCollaborator: true,
    });
    order2 = await orderFactory({
      userId: user.id,
      businessId: business.id,
      commission: 20,
      businessProfit: 80,
      isCollaborator: true,
    });
    order3 = await orderFactory({
      userId: user.id,
      businessId: business.id,
      status: OrderStatus.PAYED,
      isCollaborator: true,
    });
    cardBank = await collaboratorCardBankFactory({
      businessId: business.id,
      collaboratorId: user.id,
      cardNumber: "cardNumber",
      phone: "+5353024637",
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("createCollaboratorInvoice", async () => {
    const data = await createCollaboratorInvoice({
      ordersId: [order1.id, order2.id],
      businessId: business.id,
      amount: 100,
      collaboratorId: user.id,
      currency: "CUP",
      transferCode: "transferCode",
      confirmed: false,
      cardBankId: cardBank.id,
    });
    expect(data).toBeDefined();
    const order1FromDb = await orderRepository.getById(order1.id);
    const order2FromDb = await orderRepository.getById(order2.id);
    const order3FromDb = await orderRepository.getById(order3.id);
    expect(order1FromDb.collaboratorInvoiceId).toBe(data.id);
    expect(order2FromDb.collaboratorInvoiceId).toBe(data.id);
    expect(order3FromDb.collaboratorInvoiceId).toBeNull();
    const profile = await prisma().collaboratorProfile.findFirst({
      where: { collaboratorId: user.id, businessId: business.id },
    });
    expect(profile).toBeDefined();
    expect(profile?.totalPendingInvoiceToConfirm).toBe(1);
    expect(profile?.totalOrderForPayment).toBe(1);
    expect(profile?.totalBusinessProfit).toBe(0);
    expect(profile?.historicalProfit).toBe(0);

    await confirmInvoice(data.id);
    const profile2 = await prisma().collaboratorProfile.findFirst({
      where: { collaboratorId: user.id, businessId: business.id },
    });
    expect(profile2).toBeDefined();
    expect(profile2?.totalPendingInvoiceToConfirm).toBe(0);
    expect(profile2?.totalOrderForPayment).toBe(1);
    expect(profile2?.totalBusinessProfit).toBe(170);
    expect(profile2?.historicalProfit).toBe(30);
  });
});
