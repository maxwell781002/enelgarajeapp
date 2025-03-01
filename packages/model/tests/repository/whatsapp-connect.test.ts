import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd } from "../factories";
import { connectWhatsapp } from "../../repository/whatsapp-connect";
import createFetchMock from "vitest-fetch-mock";
import { businessRepository } from "../../repositories/business";

const fetchMocker = createFetchMock(vi);
const phone = "123456789";

describe("whatsapp connect", () => {
  let business;
  let business2;
  let whatsappConnect;

  beforeAll(async () => {
    business = await businessFactory({
      slug: "http://localhost:8000",
      canConnectWhatsapp: true,
    });
    business2 = await businessFactory({
      slug: "http://localhost:8001",
      canConnectWhatsapp: true,
    });
    fetchMocker.enableMocks();
    fetchMocker.doMock();
  });

  afterAll(async () => {
    fetchMocker.dontMock();
    await clearBd();
  });

  it("test", async () => {
    whatsappConnect = await connectWhatsapp(business.id, phone);
    expect(whatsappConnect).toBeTruthy();
    const { WHATSAPP_WEBHOOK_RETURN, BOT_WHATSAPP_URL } = process.env;
    const businessId = business.id;
    expect(fetchMocker).toHaveBeenCalledWith(
      `${BOT_WHATSAPP_URL}/instances` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
        },
        body: JSON.stringify({
          phone,
          webhook: `${WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${whatsappConnect.secureCode}`,
        }),
      },
    );
  });

  it("Reuse the same phone", async () => {
    const entity = await connectWhatsapp(business2.id, phone);
    expect(fetchMocker).toHaveBeenCalledOnce();
    expect(entity.id).toBe(whatsappConnect.id);
  });

  it("Check the connections", async () => {
    const entity1 = await businessRepository.getById(business.id);
    const entity2 = await businessRepository.getById(business2.id);
    expect(entity1.whatsappConnectId).toBe(whatsappConnect.id);
    expect(entity2.whatsappConnectId).toBe(whatsappConnect.id);
  });
});
