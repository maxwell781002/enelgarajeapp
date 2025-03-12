import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { businessFactory, clearBd, userFactory } from "../../factories";
import { connectWhatsapp } from "../../../repository/whatsapp-connect";
import createFetchMock from "vitest-fetch-mock";
import { businessRepository } from "../../../repositories/business";

const fetchMocker = createFetchMock(vi);
const phone = "123456789";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("whatsapp connect", () => {
  let business;
  let business2;
  let user1;
  let user2;
  let whatsappConnect;

  beforeAll(async () => {
    user1 = await userFactory();
    user2 = await userFactory();
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
    mocksAuth.auth.mockReturnValue({ user: user1 });
    whatsappConnect = await connectWhatsapp(business.id, phone);
    expect(whatsappConnect).toBeTruthy();
    expect(whatsappConnect.ownerId).toBe(user1.id);
    const { BOT_WHATSAPP_URL } = process.env;
    expect(fetchMocker).toHaveBeenCalledWith(
      `${BOT_WHATSAPP_URL}/instances` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
          cache: "force-cache",
        },
        body: JSON.stringify({
          phone,
          data: {
            id: whatsappConnect.id,
            secureCode: whatsappConnect.secureCode,
          },
        }),
      },
    );
  });

  it("Reuse the same phone", async () => {
    mocksAuth.auth.mockReturnValue({ user: user1 });
    const entity = await connectWhatsapp(business2.id, phone);
    expect(fetchMocker).toHaveBeenCalledOnce();
    expect(entity.id).toBe(whatsappConnect.id);
  });

  it("with other user", async () => {
    mocksAuth.auth.mockReturnValue({ user: user2 });
    try {
      await connectWhatsapp(business2.id, phone);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("whatsapp_connected_to_other_user");
    }
  });

  it("Check the connections", async () => {
    const entity1 = await businessRepository.getById(business.id);
    const entity2 = await businessRepository.getById(business2.id);
    expect(entity1.whatsappConnectId).toBe(whatsappConnect.id);
    expect(entity2.whatsappConnectId).toBe(whatsappConnect.id);
  });
});
