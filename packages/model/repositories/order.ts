import prisma, { Prisma } from "../prisma/prisma-client";
import { BaseRepository } from "../lib/base-repository";
import {
  CompleteBusiness,
  CompleteOrder,
  CompleteUser,
  OrderModel,
} from "../prisma/zod";
import { PaginateData as BasePaginateData } from "../types/pagination";
import { OrderStatus } from "../prisma/generated/client";
import { clearWhere } from "../lib/util-query";

export const statusColors: Record<OrderStatus, string> = {
  CREATED: "bg-yellow-500",
  SEND: "bg-blue-500",
  PAYED: "bg-purple-500",
  REJECTED: "bg-red-500",
};

type PaginateData = {
  businessId?: string;
  userId?: string;
  status?: string;
  isCollaborator?: boolean;
} & BasePaginateData;

export class OrderRepository extends BaseRepository<
  CompleteOrder,
  typeof Prisma.order
> {
  constructor() {
    super(OrderModel, Prisma.order);
  }

  orderToChange() {
    return Object.entries(statusColors).filter(
      ([key]) => key !== OrderStatus.CREATED,
    );
  }

  changeStatus(id: string, status: OrderStatus) {
    return prisma().order.update({
      where: { id },
      data: { status },
    });
  }

  paginate({
    businessId,
    userId,
    status,
    query,
    isCollaborator,
    ...data
  }: PaginateData = {}) {
    const where = clearWhere({
      businessId,
      userId,
      status,
      isCollaborator,
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
    return `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${position}`;
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

  async placeOrder(
    order: CompleteOrder,
    user: CompleteUser,
    business: CompleteBusiness,
    isCollaborator: boolean = false,
  ) {
    const newPosition = (await this.getLastPosition(business.id)) + 1;
    return prisma().order.update({
      where: { id: order.id },
      data: {
        isCollaborator,
        userId: user.id,
        total: order.total,
        status: OrderStatus.SEND,
        position: newPosition,
        sentAt: new Date(),
        businessId: business.id,
        currency: business.currency,
        shipping: order.shipping,
        identifier: this.generateIdentifier(new Date(), newPosition),
      },
    });
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

  getOrderById(id: string) {
    return prisma().order.findUnique({
      where: { id },
      include: {
        user: true,
        orderAddress: {
          include: { address: { include: { neighborhood: true } } },
        },
        items: {
          include: { product: { include: { priceValues: true } } },
          orderBy: { position: "asc" },
        },
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
      userId,
      isCollaborator: true,
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
    const totalPendingInvoiceToConfirm = prisma().order.count({
      where: {
        ...where,
        collaboratorInvoice: {
          confirmed: {
            equals: false,
          },
        },
      },
    });
    const totalOrderForPayment = prisma().order.count({
      where: {
        ...where,
        status: OrderStatus.PAYED,
        collaboratorInvoiceId: null,
      },
    });
    const values = await Promise.all([
      historicalProfit,
      totalPendingInvoiceToConfirm,
      totalOrderForPayment,
    ]);
    return {
      historicalProfit: values[0]._sum.commission ?? 0,
      totalBusinessProfit: values[0]._sum.businessProfit ?? 0,
      totalPendingInvoiceToConfirm: values[1] ?? 0,
      totalOrderForPayment: values[2] ?? 0,
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
      },
    });
  }
}

export const orderRepository = new OrderRepository();
