import { CompleteProduct } from "@repo/model/zod/product";
import { commissionCalculate, formatPrice } from "@repo/model/lib/utils";
// import { addProductFields } from "@repo/model/repository/product";
import { getCollaboratorProductUrl } from "@repo/model/repository/product";

// export const addProductFields = (product: any) => {
//   if (!product) return product;
//   const _isOffer = !!(product.offerPrice && product.offerPrice < product.price);
//   const price = _isOffer ? product.offerPrice : product.price;
//   const [commission, businessProfit] = commissionCalculate(
//     price,
//     product.priceValues?.commissionType,
//     product.priceValues?.commissionValue || 0,
//   );
//   return {
//     ...product,
//     _commission: commission,
//     _businessProfit: businessProfit,
//     _isOffer,
//     _price: price,
//     _outOfStock: !product.allowOrderOutOfStock &&
//       product.isExhaustible &&
//       product.stock <= 0,
//   };
// };

export const getProductMessageText = (_product: CompleteProduct) => {
  // const product = addProductFields(_product);
  return "ss";
  // return `🛒 Producto: *${product.name}*
  // 💵 Precio: *${formatPrice(product._price, product.business.currency)}*
  // 💰 Comisión: *${formatPrice(product._commission, product.business.currency)}*
  // 🛍️ En Stock: *${product.stock}*
  // 🛒️ Fuera de Stock: *${product._outOfStock ? "Si" : "No"}*
  // ${product.socialNetworksDescription || ""}
  // 🔗 url: ${getCollaboratorProductUrl(product)}
  // `;
};
