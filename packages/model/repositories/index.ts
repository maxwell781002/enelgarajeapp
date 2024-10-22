import { BaseRepository } from "../lib/base-repository";
import { businessRepository } from "./business";
import { categoryRepository } from "./category";
import { orderRepository } from "./order";
import { productRepository } from "./product";
import { telegramBusinessRepository } from "./telegram-business";
import { userRepository } from "./user";

export default {
  [orderRepository.getRepositoryModelName()]: orderRepository,
  [businessRepository.getRepositoryModelName()]: businessRepository,
  [productRepository.getRepositoryModelName()]: productRepository,
  [userRepository.getRepositoryModelName()]: userRepository,
  [categoryRepository.getRepositoryModelName()]: categoryRepository,
  [telegramBusinessRepository.getRepositoryModelName()]:
    telegramBusinessRepository,
} as Record<string, BaseRepository<any, any>>;
