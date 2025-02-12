import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd } from "../factories";
import { connectWhatsapp } from "../../repository/whatsapp-connect";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);

describe("whatsapp connect", () => {
  let business;

  beforeAll(async () => {
    business = await businessFactory({ slug: "http://localhost:8000" });
    fetchMocker.enableMocks();
    fetchMocker.doMock();
  });

  afterAll(async () => {
    fetchMocker.dontMock();
    await clearBd();
  });

  it("test", async () => {
    const entity = await connectWhatsapp(business.id, "123456789");
    expect(entity).toBeTruthy();
    const { WHATSAPP_WEBHOOK_RETURN, WHATSAPP_CREATE_INSTANCE_URL } =
      process.env;
    const businessId = business.id;
    expect(fetchMocker).toHaveBeenCalledWith(
      WHATSAPP_CREATE_INSTANCE_URL as string,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: "123456789",
          webhook: `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${entity.secureCode}`,
        }),
      },
    );
  });
});
