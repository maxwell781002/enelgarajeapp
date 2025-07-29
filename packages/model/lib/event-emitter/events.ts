import { CompleteOrder } from "../../prisma/zod";

export class EventData<T> {
  public _eventName: string;
  constructor(
    public data: T,
    eventName: string,
  ) {
    this._eventName = eventName;
  }
  get eventName() {
    return this._eventName;
  }
}

export class OrderSend extends EventData<CompleteOrder> {
  static eventName: string = "OrderSend";
  constructor(data: CompleteOrder) {
    super(data, OrderSend.eventName);
  }
}

export class OrderCreated extends EventData<CompleteOrder> {
  static eventName: string = "OrderCreated";
  constructor(data: CompleteOrder) {
    super(data, OrderCreated.eventName);
  }
}

export class OrderPayed extends EventData<CompleteOrder> {
  static eventName: string = "OrderPayed";
  constructor(data: CompleteOrder) {
    super(data, OrderPayed.eventName);
  }
}
export class OrderRejected extends EventData<CompleteOrder> {
  static eventName: string = "OrderRejected";
  constructor(data: CompleteOrder) {
    super(data, OrderRejected.eventName);
  }
}

export class OrderPreInvoiceSent extends EventData<CompleteOrder> {
  static eventName: string = "OrderPreInvoiceSent";
  constructor(data: CompleteOrder) {
    super(data, OrderPreInvoiceSent.eventName);
  }
}

export class OrderPending extends EventData<CompleteOrder> {
  static eventName: string = "OrderPending";
  constructor(data: CompleteOrder) {
    super(data, OrderPending.eventName);
  }
}

export class EntityCreated extends EventData<any> {
  static eventName: string = "EntityCreated";
  constructor(data: any) {
    super(data, EntityCreated.eventName);
  }
}
export class EntityUpdated extends EventData<any> {
  static eventName: string = "EntityUpdated";
  constructor(data: any) {
    super(data, EntityUpdated.eventName);
  }
}
