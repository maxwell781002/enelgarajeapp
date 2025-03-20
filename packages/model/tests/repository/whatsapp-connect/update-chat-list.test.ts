import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  businessFactory,
  clearBd,
  whatsappConnectFactory,
} from "../../factories";
import createFetchMock from "vitest-fetch-mock";
import { refreshChatList } from "../../../repository/whatsapp-connect";
import { whatsappConnectRepository } from "../../../repositories/whatsapp-connect";

const fetchMocker = createFetchMock(vi);
const phone = "123456789";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("whatsapp update chat list", () => {
  let business;
  let whatsappConnect;

  beforeAll(async () => {
    whatsappConnect = await whatsappConnectFactory({
      phone: phone,
    });
    business = await businessFactory({
      whatsappConnectId: whatsappConnect.id,
    });
    fetchMocker.enableMocks();
    fetchMocker.doMock();
  });

  afterAll(async () => {
    fetchMocker.dontMock();
    await clearBd();
  });

  it("refresh chat list", async () => {
    await refreshChatList(business.id);
    const entity = await whatsappConnectRepository.getById(whatsappConnect.id);
    expect(entity.updatingChatList).toBe(true);
    expect(fetchMocker).toHaveBeenCalledWith(
      `${process.env.BOT_WHATSAPP_URL}/instances/refresh-chat-list` as string,
      {
        method: "POST",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
        },
        body: JSON.stringify({
          phone,
          data: {
            id: whatsappConnect.id,
          },
        }),
      },
    );
  });
});
