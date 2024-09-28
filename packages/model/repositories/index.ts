import { BaseRepository } from "../lib/base-repository";
import { businessRepository, BusinessRepository } from "./business";
import { categoryRepository, CategoryRepository } from "./category";
import { OrderRepository, orderRepository } from "./order";
import { productRepository, ProductRepository } from "./product";
import { userRepository, UserRepository } from "./user";

export default {
  [OrderRepository.name]: orderRepository,
  [BusinessRepository.name]: businessRepository,
  [ProductRepository.name]: productRepository,
  [UserRepository.name]: userRepository,
  [CategoryRepository.name]: categoryRepository,
} as Record<string, BaseRepository<any, any>>;
