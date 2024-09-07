import { BaseRepository } from "../lib/base-repository";
import { businessRepository, BusinessRepository } from "./business";
import { categoryRepository, CategoryRepository } from "./category";
import { OrderRepository, orderRepository } from "./order";
import { productRepository, ProductRepository } from "./product";

export default {
  [OrderRepository.name]: orderRepository,
  [BusinessRepository.name]: businessRepository,
  [CategoryRepository.name]: categoryRepository,
  [ProductRepository.name]: productRepository,
} as Record<string, BaseRepository<any, any>>;
