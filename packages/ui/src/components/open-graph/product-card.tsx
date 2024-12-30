import Image from "next/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

interface OpenGraphCardProps {
  imageUrl: string;
  productName: string;
  description: string;
  price: string;
  commission: string;
  stock: number;
  outOfStock: boolean;
  t: (key: string) => string;
}

export default function ProductOpenGraphCard({
  imageUrl,
  productName,
  description,
  price,
  commission,
  stock,
  outOfStock,
  t,
}: OpenGraphCardProps) {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={productName}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold mb-2">{productName}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-semibold">{price}</span>
          <Badge
            variant="secondary"
            className="text-sm bg-green-600 text-white"
          >
            {t("ProductOpenGraph.commission")}: {commission}
          </Badge>
        </div>
        <div className="text-sm text-gray-600">
          {outOfStock && (
            <span className="text-red-600">
              {t("ProductOpenGraph.outOfStock")}
            </span>
          )}
          {!outOfStock && stock > 0 && (
            <span className="text-green-600">
              {t("ProductOpenGraph.inStock")}: {stock}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
