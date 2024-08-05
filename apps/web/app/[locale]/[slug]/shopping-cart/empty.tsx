import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

export default function EmptyCart({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href={slug} className="mt-4" prefetch={false}>
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
