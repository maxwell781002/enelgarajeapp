import { EventData } from "./events";
import { createListener } from "./listeners";

export class Dispatcher {
  private subscribers: Record<string, Function[]> = {};

  constructor() {
    createListener(this);
  }

  on<T>(event: string, listener: (event: EventData<T>) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(listener);
  }

  emitAsync<T>(event: EventData<T>) {
    if (!this.subscribers[event.eventName]) {
      return;
    }
    const promises = this.subscribers[event.eventName].map((listener) =>
      listener(event),
    );
    return Promise.all(promises);
  }
}

export default new Dispatcher();
