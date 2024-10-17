import eventEmitter from "./lib/event-emitter";
import { OrderSend } from "./lib/event-emitter/events";
import { sendOrderToTelegram } from "./listeners/new-order";

export const connectAll = () => {
  eventEmitter.on(OrderSend.name, sendOrderToTelegram);
};
