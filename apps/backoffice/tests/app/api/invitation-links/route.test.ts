import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { clearBd } from "@repo/model/tests/factories";
import { POST } from "../../../../app/api/invitation-link/route";
import { NextRequest } from "next/server";
import { businessFactory } from "@repo/model/tests/factories";
import { invitationLinkRepository } from "@repo/model/repositories/invitation-link";

describe("POST /api/invitation-links", () => {
  let business: any;

  beforeAll(async () => {
    business = await businessFactory();
  });

  afterAll(async () => {
    await clearBd();
  });

  it.each([["COLLABORATOR"], ["MESSENGER"]])(
    "create invitation link",
    async (type) => {
      const result = await (
        await POST(
          new NextRequest(
            `http://localhost/api/invitation-links?businessId=${business.id}&secureCode=456`,
            {
              method: "POST",
              body: JSON.stringify({
                type,
              }),
            },
          ),
        )
      ).json();
      expect(result.type).to.equal(type);
      const entity = await invitationLinkRepository.getById(result.id);
      expect(entity?.type).to.equal(type);
    },
  );
});
