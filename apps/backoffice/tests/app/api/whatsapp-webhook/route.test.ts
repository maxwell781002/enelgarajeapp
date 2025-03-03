import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { POST } from "../../../../app/api/whatsapp-webhook/route";
import { NextRequest } from "next/server";
import {
  businessFactory,
  clearBd,
  whatsappConnectFactory,
} from "@repo/model/tests/factories";
import { WhatsappConnectStatus } from "@repo/model/types/enums";
import { businessRepository } from "@repo/model/repositories/business";

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

  it("Not businessId", async () => {
    const result = await (
      await POST(
        new NextRequest("http://localhost/api/whatsapp-webhook", {
          method: "POST",
          body: JSON.stringify({ code: "123" }),
        }),
      )
    ).json();
    expect(result.message).to.equal("businessId required");
  });

  it("Not secure code", async () => {
    const result = await (
      await POST(
        new NextRequest(
          `http://localhost/api/whatsapp-webhook?businessId=${business.id}`,
          {
            method: "POST",
            body: JSON.stringify({ code: "123" }),
          },
        ),
      )
    ).json();
    expect(result.message).to.equal("secureCode required");
  });

  it("Invalid code", async () => {
    const result = await (
      await POST(
        new NextRequest(
          `http://localhost/api/whatsapp-webhook?businessId=${business.id}&secureCode=123`,
          {
            method: "POST",
            body: JSON.stringify({ code: "123" }),
          },
        ),
      )
    ).json();
    expect(result.message).to.equal("NotFound");
  });

  it("Valid code", async () => {
    const result = await (
      await POST(
        new NextRequest(
          `http://localhost/api/whatsapp-webhook?businessId=${business.id}&secureCode=456`,
          {
            method: "POST",
            body: JSON.stringify({ code: "QAZXSW" }),
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
