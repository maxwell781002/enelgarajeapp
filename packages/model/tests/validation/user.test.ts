import { describe, expect, it } from "vitest";
import { AddressType, WebShoppingCartSchema } from "../../validation/user";

const cartItems = [{ productId: "1", quantity: 1 }];

describe("User", () => {
  it("I need newAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "5353024895",
      addressType: AddressType.newAddress,
      businessRequestAddress: true,
      wantDomicile: true,
      cartItems,
    });
    expect(user.success).toBe(false);
    expect(user.error).toBeDefined();
    expect(user.error?.issues.length).toBe(1);
    expect(user.error?.issues[0].path).toEqual(["newAddress"]);
  });

  it("I newAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "5353024895",
      addressType: AddressType.newAddress,
      cartItems,
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
        phone: "5353024895",
        name: "test",
        addressType: "newAddress",
        businessRequestAddress: true,
        cartItems,
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
      phone: "5353024895",
      addressType: AddressType.selectAddress,
      businessRequestAddress: true,
      wantDomicile: true,
      cartItems,
    });
    expect(user.success).toBe(false);
    expect(user.error).toBeDefined();
    expect(user.error?.issues.length).toBe(1);
    expect(user.error?.issues[0].path).toEqual(["selectAddress"]);
  });

  it("I selectAddress", () => {
    const user = WebShoppingCartSchema.safeParse({
      name: "test",
      phone: "5353024895",
      addressType: AddressType.selectAddress,
      businessRequestAddress: true,
      cartItems,
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
        phone: "5353024895",
        name: "test",
        addressType: "selectAddress",
        businessRequestAddress: true,
        cartItems,
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
      phone: "5353024895",
      addressType: AddressType.selectAddress,
      businessRequestAddress: false,
      cartItems,
    });
    expect(user).toEqual({
      success: true,
      data: {
        phone: "5353024895",
        name: "test",
        addressType: "selectAddress",
        businessRequestAddress: false,
        cartItems,
      },
    });
  });
});
