import { describe, expect, it } from "vitest";
import { createSlug } from "../../prisma/prisma-client";

describe("prisma", () => {
  it("slug point", () => {
    const {
      data: { slug },
    } = createSlug({
      args: { data: { name: "test.test2" } },
      query: (data) => data,
    });
    const slugClean = slug.substring(0, slug.length - 6);
    expect(slugClean).toBe("test-test2");
  });
});
