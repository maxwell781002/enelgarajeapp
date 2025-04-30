import { EventData } from "./events";
import { createListener } from "./listeners";

export class Dispatcher {
  private subscribers: Record<string, Function[]> = {};
  private static instance: Dispatcher;

  constructor() {
    createListener(this);
  }

  private static getInstance(): Dispatcher {
    if (this.instance === undefined) {
      this.instance = new Dispatcher();
    }
    return this.instance;
  }

  on<T>(event: string, listener: (event: EventData<T>) => void) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(listener);
  }

  static emit<T>(event: EventData<T>) {
    const instance = this.getInstance();
    const subscribers = instance.subscribers[event.eventName] || [];
    const promises = subscribers.map((listener) => listener(event));
    return Promise.all(promises);
  }
}
