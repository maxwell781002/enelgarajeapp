import eventEmitter from "./lib/event-emitter";
import { OrderSend } from "./lib/event-emitter/events";
import { sendOrderToTelegram } from "./listeners/new-order/index";

export const connectAll = () => {
  eventEmitter.on(OrderSend.name, sendOrderToTelegram);
};
