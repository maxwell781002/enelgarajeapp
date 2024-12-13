import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd, userFactory } from "../../factories";
import { collaboratorInvoiceRepository } from "../../../repositories/collaborator-invoice";
import { Currency } from "../../../types/enums";
import {
  EntityCreated,
  EntityUpdated,
} from "../../../lib/event-emitter/events";

const module = vi.hoisted(() => ({
  updateCollaboratorProfileByInvoice: vi.fn(),
}));
vi.mock("../../../listeners/collaborator-invoice", () => ({
  updateCollaboratorProfileByInvoice: module.updateCollaboratorProfileByInvoice,
}));

describe("Update collaborator profile", () => {
  let user;
  let business;
  let invoice;
  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
  });
  afterAll(async () => {
    await clearBd();
  });

  it("Create invoice", async () => {
    invoice = await collaboratorInvoiceRepository.create({
      amount: 20,
      currency: Currency.CUP,
      transferCode: "transferCode",
      businessId: business.id,
      collaboratorId: user.id,
      confirmed: false,
    });
    expect(module.updateCollaboratorProfileByInvoice).toBeCalledWith(
      new EntityCreated(invoice),
    );
  });

  it("Update invoice", async () => {
    invoice = await collaboratorInvoiceRepository.create({
      amount: 20,
      currency: Currency.CUP,
      transferCode: "transferCode",
      businessId: business.id,
      collaboratorId: user.id,
      confirmed: false,
    });
    expect(module.updateCollaboratorProfileByInvoice).toBeCalledWith(
      new EntityUpdated(invoice),
    );
  });
});
