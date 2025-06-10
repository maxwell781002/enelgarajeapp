import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { clearBd, userFactory } from "../factories";
import {
  generateExternalSection,
  getExternalSection,
} from "../../repository/external-section";
import { externalSectionRepository } from "../../repositories/external-section";

const mocksAuth = vi.hoisted(() => ({
  auth: vi.fn(() => ({})),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: mocksAuth.auth,
}));

describe("ExternalSectionRepository", () => {
  let user;
  beforeAll(async () => {
    user = await userFactory();
  });

  afterAll(async () => {
    await clearBd();
  });

  it("generateExternalSection", async () => {
    mocksAuth.auth.mockReturnValue({ user });
    const result = await generateExternalSection();
    expect(result).toBeDefined();
    const userEntity = await getExternalSection(result.token);
    expect(userEntity).toBeDefined();
    expect(userEntity.id).toBe(user.id);
    const tokenEntity = await externalSectionRepository.getById(result.id);
    expect(tokenEntity).toBeNull();
  });

  it("generateExternalSection Out of date", async () => {
    mocksAuth.auth.mockReturnValue({ user });
    const result = await generateExternalSection();
    expect(result).toBeDefined();
    await externalSectionRepository.update(result.id, {
      createdAt: new Date(Date.now() - 6 * 60 * 1000),
      token: result.token,
      userId: user.id,
    });
    const userEntity = await getExternalSection(result.token);
    expect(userEntity).toBeUndefined();
    const tokenEntity = await externalSectionRepository.getById(result.id);
    expect(tokenEntity).not.toBeNull();
  });
});
