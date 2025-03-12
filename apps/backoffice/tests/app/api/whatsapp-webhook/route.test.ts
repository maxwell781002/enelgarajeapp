import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { POST } from "../../../../app/api/whatsapp-webhook/route";
import { NextRequest } from "next/server";
import {
  businessFactory,
  clearBd,
  whatsappConnectFactory,
} from "@repo/model/tests/factories";
import { WhatsappConnectStatus } from "@repo/model/types/enums";
import { businessRepository } from "@repo/model/repositories/business";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("POST /api/whatsapp-webhook", () => {
  let business: any;
  let whatsappConnect: any;

  beforeAll(async () => {
    whatsappConnect = await whatsappConnectFactory({
      secureCode: "456",
    });
    business = await businessFactory({
      whatsappConnectId: whatsappConnect.id,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Valid code", async () => {
    const result = await (
      await POST(
        new NextRequest(
          `http://localhost/api/whatsapp-webhook?businessId=${business.id}&secureCode=456`,
          {
            method: "POST",
            body: JSON.stringify({
              event: "create_instance",
              id: whatsappConnect.id,
              paringCode: "QAZXSW",
              secureCode: "456",
            }),
          },
        ),
      )
    ).json();
    expect(result.message).to.equal("Success");
    const entity = await businessRepository.retrieveWhatsappConnect(
      business.id,
    );
    expect(entity?.paringCode).to.equal("QAZXSW");
    expect(entity?.status).to.equal(WhatsappConnectStatus.CODE_SENT);
    expect(entity?.secureCode).to.equal("");
  });
});
