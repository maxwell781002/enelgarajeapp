"use client";

import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";
import { MinusIcon, PlusIcon, Trash2Icon } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { BtnConfirm } from "@repo/ui/components/ui/btn-confirm";
import Link from "next/link";

type Props = {
  item: CompleteOrderProduct;
  slug: string;
  onRemove: () => void;
  add: () => void;
  sub: () => void;
};

export default function CardItem({ item, onRemove, add, sub, slug }: Props) {
  return (
    <>
      <Card key={item.productId}>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="rounded-md"
                width="64"
                height="64"
                style={{ aspectRatio: "64/64", objectFit: "cover" }}
              />
              <div>
                <Link href={`/${slug}/${item.product.slug}`} prefetch={false}>
                  <h3 className="font-medium">{item.product.name}</h3>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => sub()}>
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <div>{item.quantity}</div>
                <Button variant="outline" size="icon" onClick={() => add()}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div>${(item as any).total}</div>
              <BtnConfirm
                btnIcon={<Trash2Icon className="h-4 w-4 text-red-600" />}
                title="Confirmar"
                description="¿Está seguro de querer eleminar el producto?"
                action={() => onRemove()}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
