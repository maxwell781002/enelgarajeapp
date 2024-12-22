import { describe, expect, it } from "vitest";
import { AddressType, WebShoppingCartSchema } from "../../validation/user";

describe("User", () => {
  it("I need newAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "test",
      addressType: AddressType.newAddress,
      businessRequestAddress: true,
    });
    expect(user.success).toBe(false);
    expect(user.error).toBeDefined();
    expect(user.error?.issues.length).toBe(1);
    expect(user.error?.issues[0].path).toEqual(["newAddress"]);
  });

  it("I newAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "test",
      addressType: AddressType.newAddress,
      businessRequestAddress: true,
      [AddressType.newAddress]: {
        alias: "test",
        name: "test",
        address: "test",
        city: "test",
        state: "test",
        reference: "test",
        neighborhoodId: "test",
      },
    });
    expect(user).toEqual({
      success: true,
      data: {
        phone: "test",
        name: "test",
        addressType: "newAddress",
        businessRequestAddress: true,
        newAddress: {
          alias: "test",
          name: "test",
          address: "test",
          city: "test",
          state: "test",
          reference: "test",
          neighborhoodId: "test",
        },
      },
    });
  });

  it("I need selectAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "test",
      addressType: AddressType.selectAddress,
      businessRequestAddress: true,
    });
    expect(user.success).toBe(false);
    expect(user.error).toBeDefined();
    expect(user.error?.issues.length).toBe(1);
    expect(user.error?.issues[0].path).toEqual(["selectAddress"]);
  });

  it("I selectAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "test",
      addressType: AddressType.selectAddress,
      businessRequestAddress: true,
      [AddressType.selectAddress]: {
        id: "test",
        alias: "test",
        name: "test",
        address: "test",
        city: "test",
        state: "test",
        reference: "test",
        neighborhoodId: "test",
      },
    });
    expect(user).toEqual({
      success: true,
      data: {
        phone: "test",
        name: "test",
        addressType: "selectAddress",
        businessRequestAddress: true,
        selectAddress: {
          id: "test",
          alias: "test",
          name: "test",
          address: "test",
          city: "test",
          state: "test",
          reference: "test",
          neighborhoodId: "test",
        },
      },
    });
  });

  it("I do not need selectAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "test",
      addressType: AddressType.selectAddress,
      businessRequestAddress: false,
    });
    expect(user).toEqual({
      success: true,
      data: {
        phone: "test",
        name: "test",
        addressType: "selectAddress",
        businessRequestAddress: false,
      },
    });
  });
});
