import { describe, it, expect } from "vitest";
import eventEmitter from "../../lib/event-emitter";
import { OrderSend } from "../../lib/event-emitter/events";
import { CompleteOrder } from "../../prisma/zod";

describe("EventDispatcher", () => {
  it("Add multiple listeners", () => {
    let v1;
    let v2;
    const p1 = (props: OrderSend) => (v1 = props.data);
    const p2 = (props: OrderSend) => (v2 = props.data);

    eventEmitter.on(OrderSend.name, p1);
    eventEmitter.on(OrderSend.name, p2);
    eventEmitter.dispatch(new OrderSend(1 as unknown as CompleteOrder));

    expect(v1).toBe(1);
    expect(v2).toBe(1);
  });
});
