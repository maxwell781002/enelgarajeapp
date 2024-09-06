import { BaseRepository } from "../lib/base-repository";
import { businessRepository, BusinessRepository } from "./business";
import { categoryRepository, CategoryRepository } from "./category";
import { OrderRepository, orderRepository } from "./order";

export default {
  [OrderRepository.name]: orderRepository,
  [BusinessRepository.name]: businessRepository,
  [CategoryRepository.name]: categoryRepository,
} as Record<string, BaseRepository<any, any>>;
