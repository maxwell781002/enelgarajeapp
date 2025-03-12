import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  whatsappConnectFactory,
} from "../../factories";
import { retrieveCodeByBusinessId } from "../../../repository/whatsapp-connect";
import createFetchMock from "vitest-fetch-mock";

const fetchMocker = createFetchMock(vi);
const phone = "123456789";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("retrieveCodeByBusiness", () => {
  let businessNoCanConnect;
  let businessNoWhatsappConnect;
  let business;
  let whatsappConnect;

  afterAll(async () => {
    await clearBd();
    fetchMocker.dontMock();
  });

  beforeAll(async () => {
    whatsappConnect = await whatsappConnectFactory({
      phone,
    });
    businessNoCanConnect = await businessFactory({
      canConnectWhatsapp: false,
    });
    businessNoWhatsappConnect = await businessFactory({
      slug: "http://localhost:8000",
      canConnectWhatsapp: true,
    });
    business = await businessFactory({
      slug: "http://localhost:8001",
      canConnectWhatsapp: true,
      whatsappConnectId: whatsappConnect.id,
    });
    fetchMocker.enableMocks();
    fetchMocker.doMock();
  });

  it("can connect", async () => {
    try {
      await retrieveCodeByBusinessId(businessNoCanConnect.id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Business can't connect whatsapp");
    }
  });

  it("already connected", async () => {
    try {
      await retrieveCodeByBusinessId(businessNoWhatsappConnect.id);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("Business already connected to whatsapp");
    }
  });

  it("Update code", async () => {
    fetchMocker.mockResponseOnce(JSON.stringify({ code: "code-retrieved" }));
    const entity = await retrieveCodeByBusinessId(business.id);
    expect(entity.id).to.equal(whatsappConnect.id);
    expect(entity.paringCode).to.equal("code-retrieved");
    expect(fetchMocker).toHaveBeenCalledWith(
      `${process.env.BOT_WHATSAPP_URL}/instances/retrieve-code` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
          cache: "force-cache",
        },
        body: JSON.stringify({
          phone,
        }),
      },
    );
  });
});
