import { vi, describe, it, expect, afterAll } from "vitest";
import { getRedirect } from "../middleware";
import { NextRequest } from "next/server";

const auth = vi.hoisted(() => ({
  auth: vi.fn(),
}));
vi.mock("@repo/model/lib/auth", () => ({
  auth: auth.auth,
}));

describe("Middleware", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
  it("Not session", async () => {
    const url = await getRedirect(new NextRequest("http://localhost"), null);
    expect(url).toBe("/login?redirectAfterLogin=/");
  });

  it("got to errors", async () => {
    const url = await getRedirect(new NextRequest("http://localhost/errors"), {
      user: {},
    });
    expect(url).toBeUndefined();
  });

  it("got to onboarding", async () => {
    const url = await getRedirect(
      new NextRequest("http://localhost/onboarding"),
      {
        user: {},
      },
    );
    expect(url).toBeUndefined();
  });

  it("got to business 403", async () => {
    const url = await getRedirect(
      new NextRequest("http://localhost/business1"),
      {
        user: {},
      },
    );
    expect(url).toBe("/errors/403");
  });

  it("got to business", async () => {
    const url = await getRedirect(
      new NextRequest("http://localhost/business1/aaa"),
      {
        user: {
          businessCollaboratorIds: ["business1"],
        },
      },
    );
    expect(url).toBeUndefined();
  });
});
