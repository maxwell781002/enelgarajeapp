import prisma, { Prisma, transaction } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CompleteBusiness,
  CompleteOrder,
  CompleteOrderProduct,
  OrderModel,
} from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { OrderStatus } from "../prisma/generated/client";
import { clearWhere } from "../lib/util-query";
import {
  OrderCreated,
  OrderPayed,
  OrderRejected,
  OrderSend,
} from "../lib/event-emitter/events";
import { Dispatcher } from "../lib/event-emitter";

export const statusColors: Record<OrderStatus, string> = {
  CREATED: "bg-yellow-500",
  SEND: "bg-blue-500",
  PAYED: "bg-purple-500",
  REJECTED: "bg-red-500",
};

const transitions: Record<OrderStatus, [OrderStatus, string][]> = {
  [OrderStatus.SEND]: [
    [OrderStatus.SEND, statusColors[OrderStatus.SEND]],
    [OrderStatus.PAYED, statusColors[OrderStatus.PAYED]],
    [OrderStatus.REJECTED, statusColors[OrderStatus.REJECTED]],
  ],
  [OrderStatus.PAYED]: [[OrderStatus.PAYED, statusColors[OrderStatus.PAYED]]],
  [OrderStatus.REJECTED]: [
    [OrderStatus.REJECTED, statusColors[OrderStatus.REJECTED]],
  ],
  [OrderStatus.CREATED]: [],
};
export const nextStatuses = (status: OrderStatus) => {
  return transitions[status].map((item) => item[0]);
};

type PaginateData = {
  businessId?: string;
  status?: string;
} & BasePaginateData;

type CollaboratorPaginateData = {
  userId?: string;
} & PaginateData;

export class OrderRepository extends BaseRepository<
  CompleteOrder,
  typeof Prisma.order
> {
  constructor() {
    super(OrderModel, "order");
  }

  getStatus() {
    return Object.entries(OrderStatus).filter(
      ([key]) => key !== OrderStatus.CREATED,
    );
  }

  orderToChange(currentStatus: OrderStatus) {
    return transitions[currentStatus] || [];
  }

  async changeStatus(id: string, status: OrderStatus) {
    const currentOrder = await this.model.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!nextStatuses(currentOrder.status).includes(status)) {
      throw new Error("Invalid status transition");
    }
    return transaction(async () => {
      const order = await prisma().order.update({
        where: { id },
        data: { status },
      });
      const events: Record<OrderStatus, typeof OrderSend> = {
        [OrderStatus.SEND]: OrderSend,
        [OrderStatus.PAYED]: OrderPayed,
        [OrderStatus.REJECTED]: OrderRejected,
        [OrderStatus.CREATED]: OrderCreated,
      };
      await Dispatcher.emit(new events[status](currentOrder as CompleteOrder));
      return order;
    });
  }

  basePaginate(
    { businessId, status, query, ...data }: PaginateData = {},
    where: any = {},
  ) {
    if (!businessId) throw new Error("Business id is required");
    where = clearWhere({
      businessId,
      changedByOrderId: null,
      status,
      ...where,
    });
    where.NOT = { userId: null };
    if (query) {
      where["OR"] = [
        {
          identifier: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ];
    }
    return super.paginate({
      ...data,
      where,
      orderBy: { sentAt: "desc" },
      include: {
        user: true,
      },
    });
  }

  collaboratorPaginate({ userId, ...data }: CollaboratorPaginateData = {}) {
    if (!userId) throw new Error("User id is required");
    return this.basePaginate(
      { ...data },
      {
        OR: [
          { userId, isCollaborator: true },
          { referredById: userId, isCollaborator: false },
        ],
      },
    );
  }

  collaboratorAndReferredPaginate({
    userId,
    ...data
  }: CollaboratorPaginateData = {}) {
    return this.basePaginate(
      { ...data },
      {
        OR: [
          { userId, isCollaborator: true },
          { referredById: userId, isCollaborator: false },
        ],
        collaboratorInvoiceId: null,
        status: OrderStatus.PAYED,
        commission: {
          not: 0,
        },
      },
    );
  }

  paginate(paginate: PaginateData = {}) {
    return this.basePaginate(paginate);
  }

  async isOrdersByTheSameUserOrReferred(ids: string[], userId: string) {
    return (
      ids.length ===
      (await prisma().order.count({
        where: {
          id: { in: ids },
          OR: [{ userId }, { referredById: userId }],
        },
      }))
    );
  }

  addCollaboratorInvoiceId(ids: string[], collaboratorInvoiceId: string) {
    return prisma().order.updateMany({
      where: { id: { in: ids } },
      data: { collaboratorInvoiceId },
    });
  }

  get(id: any, query?: any) {
    return super.get(id, {
      include: {
        user: true,
        items: {
          include: { product: true },
          orderBy: { position: "asc" },
        },
      },
    });
  }

  protected generateIdentifier(date: Date, position: number) {
    return `${date.getFullYear()}${
      date.getMonth() + 1
    }${date.getDate()}-${position}`;
  }

  protected async getLastPosition(businessId: string) {
    return (
      (
        await prisma().order.findFirst({
          where: { businessId },
          orderBy: { position: "desc" },
        })
      )?.position || 0
    );
  }

  async createOrder(
    order: any,
    business: CompleteBusiness,
    productItems: CompleteOrderProduct[],
  ) {
    const newPosition = (await this.getLastPosition(business.id)) + 1;
    return prisma().order.create({
      data: {
        ...order,
        status: OrderStatus.SEND,
        position: newPosition,
        identifier: this.generateIdentifier(new Date(), newPosition),
        sentAt: new Date(),
        businessId: business.id,
        currency: business.currency,
        items: {
          create: productItems,
        },
      },
      include: { items: { orderBy: { position: "asc" } }, orderAddress: true },
    });
  }

  async copyOrder(originalOrder: any, productItems: CompleteOrderProduct[]) {
    const newPosition =
      (await this.getLastPosition(originalOrder.businessId as string)) + 1;
    const { id, businessId, ...data } = originalOrder;
    const entity = await prisma().order.create({
      data: {
        ...data,
        businessId: businessId as string,
        position: newPosition,
        identifier: this.generateIdentifier(new Date(), newPosition),
        sentAt: new Date(),
        items: {
          create: productItems,
        },
      },
      include: { items: { orderBy: { position: "asc" } }, orderAddress: true },
    });
    await prisma().order.update({
      where: { id },
      data: { changedByOrderId: entity.id },
    });
    return entity;
  }

  hasOrders(productId: string) {
    return prisma().order.count({
      where: {
        items: {
          some: {
            productId,
          },
        },
      },
    });
  }

  getByBusinessAndUser(
    userId: string,
    businessId: string,
    isCollaborator: boolean = false,
  ) {
    return prisma().order.findMany({
      where: {
        userId,
        businessId,
        isCollaborator,
        NOT: { status: OrderStatus.CREATED },
      },
      include: {
        items: {
          include: { product: true },
          orderBy: { position: "asc" },
        },
      },
      orderBy: { sentAt: "desc" },
    });
  }

  // TODO: Remove this method
  getOrderById(id: string) {
    return prisma().order.findUnique({
      where: { id },
      include: {
        business: true,
        user: true,
        ticket: {
          include: { customer: true },
        },
        orderAddress: {
          include: { address: { include: { neighborhood: true } } },
        },
        items: {
          include: { product: { include: { priceValues: true } } },
          orderBy: { position: "asc" },
        },
        referredBy: true,
      },
    });
  }

  getOrderByIdAndBusinessId(id: string, businessId: string) {
    return prisma().order.findUnique({
      where: { id, businessId },
      include: {
        business: true,
        user: true,
        ticket: {
          include: { customer: true },
        },
        orderAddress: {
          include: { address: { include: { neighborhood: true } } },
        },
        items: {
          include: { product: { include: { priceValues: true } } },
          orderBy: { position: "asc" },
        },
        referredBy: true,
      },
    });
  }

  async getTotals(businessId: string) {
    const totalSend = prisma().order.count({
      where: { businessId, status: OrderStatus.SEND },
    });
    const totalPayed = prisma().order.count({
      where: { businessId, status: OrderStatus.PAYED },
    });
    const totalReject = prisma().order.count({
      where: { businessId, status: OrderStatus.REJECTED },
    });
    const values = await Promise.all([totalSend, totalPayed, totalReject]);
    return {
      totalSend: values[0],
      totalPayed: values[1],
      totalReject: values[2],
    };
  }

  async getCollaboratorStatistic(businessId: string, userId: string) {
    const where = {
      businessId,
      OR: [
        { userId, isCollaborator: true },
        { referredById: userId, isCollaborator: false },
      ],
    };
    const historicalProfit = prisma().order.aggregate({
      _sum: {
        commission: true, // Sum the commission field
        businessProfit: true, // Sum the commission field
      },
      where: {
        ...where,
        collaboratorInvoice: {
          confirmed: {
            equals: true,
          },
        },
      },
    });
    const totalOrderForPayment = prisma().order.count({
      where: {
        ...where,
        status: OrderStatus.PAYED,
        commission: {
          gt: 0,
        },
        collaboratorInvoiceId: null,
      },
    });
    const totalPaymentReferred = prisma().order.count({
      where: {
        businessId,
        referredById: userId,
        status: OrderStatus.PAYED,
      },
    });
    const values = await Promise.all([
      historicalProfit,
      totalOrderForPayment,
      totalPaymentReferred,
    ]);
    return {
      historicalProfit: values[0]._sum.commission ?? 0,
      totalBusinessProfit: values[0]._sum.businessProfit ?? 0,
      totalOrderForPayment: values[1] ?? 0,
      totalPaymentReferred: values[2] ?? 0,
    };
  }

  getAllData(orderId: string) {
    return prisma().order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        items: {
          include: { product: true },
          orderBy: { position: "asc" },
        },
        business: {
          include: { telegram: true },
        },
        orderAddress: {
          include: { address: { include: { neighborhood: true } } },
        },
        ticket: {
          include: { customer: true },
        },
        referredBy: true,
      },
    });
  }
}

export const orderRepository = new OrderRepository();
