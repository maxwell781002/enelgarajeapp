import Link from "next/link";
import { ShoppingCartIcon } from "../icons";
import { CompleteOrder } from "@repo/model/zod/order";

export default function ShoppingCartHeader({
  order,
  className,
  url = "/shopping-cart",
}: {
  order: CompleteOrder | undefined | null;
  className?: string;
  url?: string;
}) {
  return (
    <div className={className}>
      <Link
        href={url}
        className="flex items-center gap-2"
        prefetch={false}
      >
        <ShoppingCartIcon className="w-6 h-6" />
        <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-medium">
          {order?.numberOfItems || 0}
        </span>
      </Link>
    </div>
  );
}
