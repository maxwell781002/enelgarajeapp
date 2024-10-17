import EventEmitter from "node:events";
import { EventData } from "./events";

class Dispatcher extends EventEmitter {
  dispatch<T>(event: EventData<T>) {
    this.emit(event.constructor.name, event);
  }
}

export default new Dispatcher();
