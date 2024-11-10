import { Badge } from "@repo/ui/components/ui/badge";
import { cn } from "../lib/utils";
import { IProduct } from "@repo/model/types/product";

export default function ProductBadge({
  product,
  className = "",
}: {
  product: IProduct;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 justify-end", className)}>
      {product.isNew && <Badge className="bg-blue-500">Nuevo</Badge>}
      {!!product._isOffer && <Badge className="bg-green-700">En Oferta</Badge>}
    </div>
  );
}
