import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { productFactory, clearBd } from "../../factories";
import prisma from "../../../prisma/prisma-client";
import { hasProduct } from "../../../repository/order";

describe("hasProduct", () => {
  let order;
  let product1;
  let product2;

  beforeAll(async () => {
    product1 = await productFactory();
    product2 = await productFactory();
    order = await prisma.order.create({
      data: {
        productsDetails: "[]",
        items: {
          createMany: {
            data: [
              { productId: product1.id, quantity: 1, position: 1, price: 1 },
            ],
          },
        },
      },
      include: {
        items: true,
      },
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("hasProduct", async () => {
    const result = await hasProduct(product1.id, order);
    expect(result).toBe(true);
  });

  it("!hasProduct", async () => {
    const result = await hasProduct(product2.id, order);
    expect(result).toBe(false);
  });
});
