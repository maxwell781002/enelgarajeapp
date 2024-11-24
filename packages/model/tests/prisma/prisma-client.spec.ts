import { describe, expect, it } from "vitest";
import { createSlug } from "../../prisma/prisma-client";

describe("prisma", () => {
  it.each([
    ["test.test2", "test-test2"],
    ["test+test2", "test-test2"],
  ])("add(%i, %i) -> %i", (input, expected) => {
    const {
      data: { slug },
    } = createSlug({
      args: { data: { name: input } },
      query: (data) => data,
    });
    const slugClean = slug.substring(0, slug.length - 6);
    expect(slugClean).toBe(expected);
  });
});
