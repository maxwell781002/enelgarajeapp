import { BaseRepository } from "../lib/base-repository";
import { businessRepository } from "./business";
import { categoryRepository } from "./category";
import { orderRepository } from "./order";
import { orderAddressRepository } from "./order-address";
import { paymentMethodRepository } from "./payment-method";
import { productRepository } from "./product";
import { telegramBusinessRepository } from "./telegram-business";
import { userRepository } from "./user";
import { userAddressRepository } from "./user-address";

export default {
  [orderRepository.getRepositoryModelName()]: orderRepository,
  [businessRepository.getRepositoryModelName()]: businessRepository,
  [productRepository.getRepositoryModelName()]: productRepository,
  [userRepository.getRepositoryModelName()]: userRepository,
  [categoryRepository.getRepositoryModelName()]: categoryRepository,
  [userAddressRepository.getRepositoryModelName()]: userAddressRepository,
  [orderAddressRepository.getRepositoryModelName()]: orderAddressRepository,
  [paymentMethodRepository.getRepositoryModelName()]: paymentMethodRepository,
  [telegramBusinessRepository.getRepositoryModelName()]:
    telegramBusinessRepository,
} as Record<string, BaseRepository<any, any>>;
