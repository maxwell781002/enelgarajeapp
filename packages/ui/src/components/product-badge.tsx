import { Badge } from "@repo/ui/components/ui/badge";
import { CompleteProduct } from "@repo/model/zod/product";
import { cn } from "../lib/utils";

export default function ProductBadge({
  product,
  className = "",
}: {
  product: CompleteProduct;
  className?: string;
}) {
  const isOffer = product.offerPrice && product.offerPrice < product.price;
  return (
    <div className={cn("flex gap-2 justify-end", className)}>
      {product.isNew && <Badge className="bg-blue-500">Nuevo</Badge>}
      {product.outOfStock && <Badge className="bg-orange-400">Agotado</Badge>}
      {isOffer && <Badge className="bg-green-700">En Oferta</Badge>}
    </div>
  );
}
