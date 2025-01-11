import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { businessFactory, clearBd } from "../factories";
import { createCustomer } from "../../repository/customer";
import prisma from "../../prisma/prisma-client";

describe("createCustomer", () => {
  let business;
  beforeAll(async () => {
    business = await businessFactory({ slug: "http://localhost:3000" });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("create customer 1", async () => {
    const customer = await createCustomer({
      identification: "1234567890",
      phone: "+5353024637",
      name: "Pepe",
      businessId: business.id,
    });
    expect(customer).toBeDefined();
    const phones = JSON.parse(customer.phones);
    expect(phones.length).toBe(1);
    expect(phones[0].phone).toBe("+5353024637");
  });

  it("create customer 2", async () => {
    const customer = await createCustomer({
      identification: "1234567880",
      phone: "+5353024640",
      name: "Pepe",
      businessId: business.id,
    });
    expect(customer).toBeDefined();
    const phones = JSON.parse(customer.phones);
    expect(phones.length).toBe(1);
    expect(phones[0].phone).toBe("+5353024640");

    const customers = await prisma().customer.findMany({
      where: { businessId: business.id },
    });
    expect(customers.length).toBe(2);
  });

  it("add the same customer 1", async () => {
    const customer = await createCustomer({
      identification: "1234567890",
      phone: "+5353024637",
      name: "Pepe",
      businessId: business.id,
    });
    expect(customer).toBeDefined();
    const phones = JSON.parse(customer.phones);
    expect(phones.length).toBe(1);
    expect(phones[0].phone).toBe("+5353024637");

    const customers = await prisma().customer.findMany({
      where: { businessId: business.id },
    });
    expect(customers.length).toBe(2);
  });

  it("add the same customer 1 but updated", async () => {
    const customer = await createCustomer({
      identification: "1234567890",
      phone: "+5353024638",
      name: "Pepe1",
      businessId: business.id,
    });
    expect(customer).toBeDefined();
    expect(customer.name).toBe("Pepe1");
    const phones = JSON.parse(customer.phones);
    expect(phones.length).toBe(2);
    expect(phones[0].phone).toBe("+5353024637");
    expect(phones[1].phone).toBe("+5353024638");

    const customers = await prisma().customer.findMany({
      where: { businessId: business.id },
    });
    expect(customers.length).toBe(2);
  });
});
