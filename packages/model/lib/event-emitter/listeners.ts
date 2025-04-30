import { Dispatcher } from ".";
import { updateCollaboratorProfileListener } from "../../listeners/update-order";
import { restoreOrder } from "../../repository/product";
import { OrderPayed, OrderRejected } from "./events";

export const createListener = (dispatcher: Dispatcher) => {
  dispatcher.on(OrderRejected.eventName, restoreOrder);
  dispatcher.on(OrderPayed.eventName, updateCollaboratorProfileListener);
};
