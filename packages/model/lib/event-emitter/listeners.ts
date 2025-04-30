import { Dispatcher } from ".";
import { restoreOrder } from "../../repository/product";
import { OrderRejected } from "./events";

export const createListener = (dispatcher: Dispatcher) => {
  dispatcher.on(OrderRejected.eventName, restoreOrder);
};
