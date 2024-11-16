import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  businessFactory,
  businessNeighborhoodFactory,
  clearBd,
  neighborhoodFactory,
} from "../../factories";
import { businessShipping } from "../../../repository/business-neighborhood";

describe("Shipping", () => {
  const city = "city1";
  let business;
  beforeAll(async () => {
    business = await businessFactory();
    const businessId = business.id;
    await neighborhoodFactory({ name: "neighborhood1", city });
    await businessNeighborhoodFactory({
      businessId,
      shipping: 100,
      neighborhoodId: (
        await neighborhoodFactory({ name: "neighborhood2", city })
      ).id,
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("test", async () => {
    const shipping = await businessShipping(business.id, city);
    expect(shipping[0].shipping).toEqual(0);
    expect(shipping[0].name).toEqual("neighborhood1");
    expect(shipping[1].shipping).toEqual(100);
    expect(shipping[1].name).toEqual("neighborhood2");
  });
});
