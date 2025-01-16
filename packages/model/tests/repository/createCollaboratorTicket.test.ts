import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  clearBd,
  orderCustomerFactory,
  orderFactory,
  userFactory,
} from "../factories";
import { createCollaboratorTicket } from "../../repository/collaborator-ticket";
import { Currency } from "../../types/enums";
import { FormOfPaymentType } from "../../prisma/generated/client";

describe("createCollaboratorTicket", () => {
  let business;
  let order;
  let customer;
  let collaborator;

  beforeAll(async () => {
    business = await businessFactory();
    order = await orderFactory({ businessId: business.id });
    collaborator = await userFactory();
    customer = await orderCustomerFactory({
      businessId: business.id,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Create collaborator ticket", async () => {
    const collaboratorTicket = await createCollaboratorTicket(
      {
        currency: Currency.CUP,
        deliveryDate: new Date(),
        formOfPayment: FormOfPaymentType.TRANSFER,
        nota: "",
        acceptTerms: true,
      },
      business.id,
      customer.id,
      order.id,
      collaborator.id,
      "123456",
    );
    expect(collaboratorTicket).toBeDefined();
  });
});
