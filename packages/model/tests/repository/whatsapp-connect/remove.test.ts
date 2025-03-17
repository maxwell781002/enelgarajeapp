import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import {
  businessFactory,
  clearBd,
  whatsappConnectFactory,
} from "../../factories";
import { removeInstanceByBusinessId } from "../../../repository/whatsapp-connect";
import { businessRepository } from "../../../repositories/business";

const fetchMocker = createFetchMock(vi);
const phone = "123456789";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("Remove connection", () => {
  let business;
  let business2;
  let whatsappConnect;

  beforeAll(async () => {
    whatsappConnect = await whatsappConnectFactory({
      phone,
    });
    business = await businessFactory({
      slug: "http://localhost:8000",
      canConnectWhatsapp: true,
      whatsappConnectId: whatsappConnect.id,
    });
    business2 = await businessFactory({
      slug: "http://localhost:8001",
      canConnectWhatsapp: true,
      whatsappConnectId: whatsappConnect.id,
    });
    fetchMocker.enableMocks();
    fetchMocker.doMock();
  });

  afterAll(async () => {
    fetchMocker.dontMock();
    await clearBd();
  });

  it("Remove the first business", async () => {
    await removeInstanceByBusinessId(business.id);
    expect(fetchMocker).not.toHaveBeenCalled();
    const count = await businessRepository.countByWhatsappConnect(
      whatsappConnect.id,
    );
    expect(count).toBe(1);
  });

  it("Remove the second business", async () => {
    await removeInstanceByBusinessId(business2.id);
    const count = await businessRepository.countByWhatsappConnect(
      whatsappConnect.id,
    );
    expect(count).toBe(0);
    expect(fetchMocker).toHaveBeenCalledWith(
      `${process.env.BOT_WHATSAPP_URL}/instances/${phone}` as string,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
        },
      },
    );
  });
});
