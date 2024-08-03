"use client";

import { CardContent, Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

type CardItemProps = {
  name?: string;
  description?: string;
  baseUrl?: string;
  slug: string;
  onAdd?: () => void;
  price: number;
  image: string;
};

export function CardItem({
  name,
  description,
  price,
  image,
  baseUrl,
  slug,
  onAdd,
}: CardItemProps) {
  return (
    <Card>
      <Link href={`/${baseUrl}/${slug}`} prefetch={false}>
        <img
          src={image}
          alt={name}
          className="rounded-t-lg object-cover w-full h-48"
        />
      </Link>
      <CardContent className="p-4">
        {!!name && <h3 className="text-lg font-bold mb-2 font-sans">{name}</h3>}
        {!!description && (
          <p className="text-muted-foreground mb-4 font-sans">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">${price}</span>
          <Button onClick={() => onAdd?.()}>OK</Button>
        </div>
      </CardContent>
    </Card>
  );
}
