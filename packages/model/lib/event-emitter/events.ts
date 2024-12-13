import { CompleteOrder } from "../../prisma/zod";

export class EventData<T> {
  constructor(public data: T) {}
}

export class OrderSend extends EventData<CompleteOrder> {}
export class OrderPayed extends EventData<CompleteOrder> {}

export class EntityCreated extends EventData<any> {}
export class EntityUpdated extends EventData<any> {}
