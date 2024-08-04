import { CardContent, Card } from "../ui/card";
import Link from "next/link";
import { CheckIcon } from "@repo/ui/components/icons";
import { BtnAddCart } from "../add-cart";

type CardItemProps = {
  name?: string;
  description?: string;
  baseUrl?: string;
  slug: string;
  onAdd?: () => void;
  price: number;
  image: string;
  inCart?: boolean;
};

export function CardItem({
  name,
  description,
  price,
  image,
  baseUrl,
  slug,
  onAdd,
  inCart = false,
}: CardItemProps) {
  return (
    <Card>
      <div className="relative">
        {inCart && (
          <div className="absolute top-2 left-2 bg-red-600 rounded-full p-1">
            <CheckIcon className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <Link href={`/${baseUrl}/${slug}`} prefetch={false}>
          <img
            src={image}
            alt={name}
            className="rounded-t-lg object-cover w-full h-48"
          />
        </Link>
      </div>
      <CardContent className="p-4">
        {!!name && <h3 className="text-lg font-bold mb-2 font-sans">{name}</h3>}
        {!!description && (
          <p className="text-muted-foreground mb-4 font-sans">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">${price}</span>
          <BtnAddCart action={onAdd} />
        </div>
      </CardContent>
    </Card>
  );
}
