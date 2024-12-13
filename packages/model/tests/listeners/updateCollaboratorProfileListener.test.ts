import { describe, expect, it, vi } from "vitest";
import { updateCollaboratorProfileListener } from "../../listeners/update-order";
import { OrderPayed } from "../../lib/event-emitter/events";
import { CompleteOrder } from "../../prisma/zod";

const module = vi.hoisted(() => ({
  updateCollaboratorProfile: vi.fn(),
}));
vi.mock("../../repository/collaborator-invoice", () => ({
  updateCollaboratorProfile: module.updateCollaboratorProfile,
}));

describe("updateCollaboratorProfileListener", () => {
  it("Is not collaborator", () => {
    updateCollaboratorProfileListener(
      new OrderPayed({
        isCollaborator: false,
      } as CompleteOrder),
    );
    expect(module.updateCollaboratorProfile).not.toBeCalled();
  });

  it("Is collaborator", () => {
    updateCollaboratorProfileListener(
      new OrderPayed({
        isCollaborator: true,
        userId: "userId",
        businessId: "businessId",
      } as CompleteOrder),
    );
    expect(module.updateCollaboratorProfile).toBeCalledWith(
      "userId",
      "businessId",
    );
  });
});
