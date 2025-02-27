import { CompleteProduct } from "@repo/model/zod/product";
import Image from "@repo/ui/components/image";
import { Card, CardContent } from "@repo/ui/components/ui/card";

export type WhatsAppCardProps = {
  product: CompleteProduct;
};

export default function WhatsAppCard({ product }: WhatsAppCardProps) {
  return (
    <Card className="w-64 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={product.image}
            alt="Card image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="bg-white p-3">
          <p className="text-sm text-gray-700 line-clamp-2">{product.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}
