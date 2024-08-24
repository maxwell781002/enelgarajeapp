import { BaseRepository } from "../lib/base-repository";
import { OrderRepository, orderRepository } from "./order";

export default {
  [OrderRepository.name]: orderRepository,
} as Record<string, BaseRepository<any>>;
