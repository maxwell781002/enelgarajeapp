import { BaseRepository } from "../lib/base-repository";
import { businessRepository, BusinessRepository } from "./business";
import { OrderRepository, orderRepository } from "./order";

export default {
  [OrderRepository.name]: orderRepository,
  [BusinessRepository.name]: businessRepository,
} as Record<string, BaseRepository<any>>;
