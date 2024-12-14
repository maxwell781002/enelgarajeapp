import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  orderFactory,
  userFactory,
} from "../../factories";
import { createCollaboratorInvoice } from "../../../repository/collaborator-invoice";
import { orderRepository } from "../../../repositories/order";

describe.only("createCollaboratorInvoice", () => {
  let business;
  let order1;
  let order2;
  let order3;
  let user;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory({ slug: "http://localhost:3000" });
    order1 = await orderFactory({ businessId: business.id });
    order2 = await orderFactory({ businessId: business.id });
    order3 = await orderFactory({ businessId: business.id });
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
    });
    expect(data).toBeDefined();
    const order1FromDb = await orderRepository.getById(order1.id);
    const order2FromDb = await orderRepository.getById(order2.id);
    const order3FromDb = await orderRepository.getById(order3.id);
    expect(order1FromDb.collaboratorInvoiceId).toBeDefined();
    expect(order2FromDb.collaboratorInvoiceId).toBeDefined();
    expect(order3FromDb.collaboratorInvoiceId).toBeNull();
  });
});
