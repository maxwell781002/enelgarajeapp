import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  createCollaboratorOrder,
  createWebOrder,
} from "../../repository/checkout";
import {
  businessFactory,
  businessNeighborhoodFactory,
  clearBd,
  neighborhoodFactory,
  productFactory,
  userFactory,
} from "../factories";
import { CommissionTypes, Currency } from "../../types/enums";
import { FormOfPaymentType, OrderStatus } from "../../prisma/generated/client";
import { productRepository } from "../../repositories/product";
import { AddressType } from "../../validation/user";
import prisma from "@repo/model/prisma/prisma-client";
import { TCustomerForm } from "../../validation/customer";
import { TCollaboratorTicketForm } from "../../validation/collaborator-ticket";
import { customerRepository } from "../../repositories/customer";
import { collaboratorTicketRepository } from "../../repositories/collaborator-ticket";

const mocksCookies = vi.hoisted(() => ({
  get: vi.fn(() => ({ value: "" })),
  set: vi.fn(),
  delete: vi.fn(),
}));
vi.mock("next/headers", () => ({
  headers: () => ({
    get: vi.fn(() => "http://localhost:3000"),
  }),
  cookies: () => ({
    get: mocksCookies.get,
    set: mocksCookies.set,
    delete: mocksCookies.delete,
  }),
}));

vi.mock("../../repository/user", () => ({}));

const sendOrderToTelegram = vi.hoisted(() => vi.fn());
vi.mock("../../../listeners/new-order", () => ({
  sendOrderToTelegram: sendOrderToTelegram,
}));

const customer: TCustomerForm = {
  name: "Pepe",
  identification: "1234567890",
  phone: "+5353024637",
};
const ticket: TCollaboratorTicketForm = {
  deliveryDate: new Date(),
  currency: Currency.CUP,
  formOfPayment: FormOfPaymentType.CASH,
  nota: "nota",
  acceptTerms: true,
};

describe("Checkout", () => {
  let business;
  let user;
  let product1;
  let product2;
  let neighborhood;

  beforeAll(async () => {
    user = await userFactory();
    business = await businessFactory();
    neighborhood = await neighborhoodFactory({
      name: "neighborhood1",
      city: "city1",
    });
    await businessNeighborhoodFactory({
      businessId: business.id,
      neighborhoodId: neighborhood.id,
      shipping: 100,
    });
    product1 = await productFactory({
      allowOrderOutOfStock: false,
      isExhaustible: true,
      stock: 10,
      businessId: business.id,
      price: 50,
      priceValues: {
        create: {
          commissionValue: 10,
          commissionType: CommissionTypes.FIXED,
        },
      },
    });
    product2 = await productFactory({
      businessId: business.id,
      price: 60,
      priceValues: {
        create: {
          commissionValue: 20,
          commissionType: CommissionTypes.FIXED,
        },
      },
    });
  });

  afterAll(async () => {
    await clearBd();
  });

  it("Collaborator", async () => {
    const order = await createCollaboratorOrder(business, user, {
      customer,
      ticket,
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: false,
      address: {
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhood.id,
      },
    });
    const customerEntity = await customerRepository.findFirst({
      identification: user.identification,
    });
    expect(customerEntity).toBeDefined();
    const ticketEntity = await collaboratorTicketRepository.findFirst({
      collaboratorId: user.id,
      businessId: business.id,
      orderId: order.id,
      customerId: customerEntity.id,
      phone: customer.phone,
    });
    expect(ticketEntity).toBeDefined();
    const date = new Date();
    const position = 1;
    const identifier = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
    expect(order.total).toBe(170);
    expect(order.commission).toBe(50);
    expect(order.businessProfit).toBe(120);
    expect(order.userId).toBe(user.id);
    expect(order.shipping).toBe(0);
    expect(order.hasShipping).toBe(false);
    expect(order.status).toBe(OrderStatus.SEND);
    expect(order.position).toBe(1);
    expect(order.businessId).toBe(business.id);
    expect(order.identifier).toBe(identifier);
    expect(order.isCollaborator).toBe(true);
    expect(order.currency).toBe(business.currency);
    expect(order.orderAddress).toBeNull();
    expect(order.items).toEqual([
      {
        productId: product1.id,
        orderId: order.id,
        price: 50,
        position: 0,
        commission: 10,
        businessProfit: 40,
        quantity: 1,
        customPrice: 0,
      },
      {
        productId: product2.id,
        orderId: order.id,
        price: 120,
        position: 0,
        commission: 40,
        businessProfit: 80,
        quantity: 2,
        customPrice: 0,
      },
    ]);
    const productEntity = await productRepository.getById(product1.id);
    expect(productEntity.stock).toBe(9);
  });

  it("Collaborator, Bad custom price", async () => {
    try {
      await createCollaboratorOrder(business, user, {
        customer,
        ticket,
        cartItems: [
          {
            productId: product1.id,
            quantity: 10,
            customPrice: 10,
          },
          {
            productId: product2.id,
            quantity: 2,
          },
        ],
        wantDomicile: false,
      });
      expect(false).toBe(true);
    } catch (e) {
      expect(e.message).toBe("error_price_custom");
      const productEntity = await productRepository.getById(product1.id);
      expect(productEntity.stock).toBe(9);
    }
  });

  it("Collaborator with custom price", async () => {
    const order = await createCollaboratorOrder(business, user, {
      customer,
      ticket,
      cartItems: [
        {
          productId: product1.id,
          quantity: 2,
          customPrice: 180,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: false,
    });
    const date = new Date();
    const position = 2;
    const identifier = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
    expect(order.total).toBe(480); // ok
    expect(order.businessProfit).toBe(160); // ok
    expect(order.commission).toBe(320); //ok
    expect(order.userId).toBe(user.id);
    expect(order.shipping).toBe(0);
    expect(order.hasShipping).toBe(false);
    expect(order.status).toBe(OrderStatus.SEND);
    expect(order.position).toBe(2);
    expect(order.businessId).toBe(business.id);
    expect(order.identifier).toBe(identifier);
    expect(order.isCollaborator).toBe(true);
    expect(order.currency).toBe(business.currency);
    expect(order.orderAddress).toBeNull();
    expect(order.items).toEqual([
      {
        productId: product2.id,
        orderId: order.id,
        price: 120,
        position: 0,
        commission: 40,
        businessProfit: 80,
        quantity: 2,
        customPrice: 0,
      },
      {
        productId: product1.id,
        orderId: order.id,
        price: 360,
        position: 0,
        commission: 280,
        businessProfit: 80,
        quantity: 2,
        customPrice: 180,
      },
    ]);
    const productEntity = await productRepository.getById(product1.id);
    expect(productEntity.stock).toBe(7);
  });

  it("Collaborator with domicile", async () => {
    const order = await createCollaboratorOrder(business, user, {
      customer,
      ticket,
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: true,
      address: {
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhood.id,
      },
    });
    expect(order.shipping).toBe(100);
    expect(order.hasShipping).toBe(true);
    expect(order.total).toBe(270);
    expect(order.orderAddress).toBeDefined();
    const productEntity = await productRepository.getById(product1.id);
    expect(productEntity.stock).toBe(6);
  });

  it("Is normal user", async () => {
    const order = await createWebOrder(business, user, {
      phone: "253",
      name: "test",
      addressType: AddressType.newAddress,
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: true,
      [AddressType.newAddress]: {
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhood.id,
      },
    });
    const date = new Date();
    const position = 4;
    const identifier = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
    expect(order.orderAddress).toBeDefined();
    expect(order.total).toBe(270);
    expect(order.commission).toBe(0);
    expect(order.businessProfit).toBe(0);
    expect(order.userId).toBe(user.id);
    expect(order.shipping).toBe(100);
    expect(order.hasShipping).toBe(true);
    expect(order.status).toBe(OrderStatus.SEND);
    expect(order.position).toBe(4);
    expect(order.businessId).toBe(business.id);
    expect(order.identifier).toBe(identifier);
    expect(order.isCollaborator).toBe(false);
    expect(order.currency).toBe(business.currency);
    expect(order.items).toEqual([
      {
        productId: product2.id,
        orderId: order.id,
        price: 120,
        position: 0,
        commission: 0,
        businessProfit: 0,
        quantity: 2,
        customPrice: 0,
      },
      {
        productId: product1.id,
        orderId: order.id,
        price: 50,
        position: 0,
        commission: 0,
        businessProfit: 0,
        quantity: 1,
        customPrice: 0,
      },
    ]);
    const productEntity = await productRepository.getById(product1.id);
    expect(productEntity.stock).toBe(5);
    const address = await prisma().userAddress.findFirst({
      where: { userId: user.id },
    });
    expect(address).toBeDefined();
  });

  it("Is normal user, select address", async () => {
    const order = await createWebOrder(business, user, {
      phone: "253",
      name: "test",
      addressType: AddressType.selectAddress,
      cartItems: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
      wantDomicile: true,
      [AddressType.selectAddress]: {
        id: "1",
        name: "Peter Parker",
        address: "123 Main St",
        city: "city",
        state: "state",
        reference: "12345",
        neighborhoodId: neighborhood.id,
      },
    });
    expect(order.orderAddress).toBeDefined();
    const productEntity = await productRepository.getById(product1.id);
    expect(productEntity.stock).toBe(4);
    const addresses = await prisma().userAddress.findMany({
      where: { userId: user.id },
    });
    expect(addresses.length).toBe(1);
  });

  it("Out of stock", async () => {
    try {
      await createWebOrder(business, user, {
        phone: "253",
        name: "test",
        addressType: AddressType.selectAddress,
        cartItems: [
          {
            productId: product1.id,
            quantity: 100,
          },
        ],
        wantDomicile: false,
      });
      expect(false).toBe(true);
    } catch (e) {
      expect(e.message).toBe("out_of_stock");
      const productEntity = await productRepository.getById(product1.id);
      expect(productEntity.stock).toBe(4);
    }
  });
});
