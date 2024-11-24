import { CompleteOrder } from "../../prisma/zod";

export class EventData<T> {
  constructor(public data: T) {}
}

export class OrderSend extends EventData<CompleteOrder> {}
