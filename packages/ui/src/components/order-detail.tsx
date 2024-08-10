import Link from "next/link";
import { Separator } from "./ui/separator";

export default function OrderDetail() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tighter">
              Order Summary
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Order #12345</div>
                <div>June 23, 2023</div>
              </div>
              <Separator />
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Glimmer Lamps</div>
                  <div>2 x $50.00</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Aqua Filters</div>
                  <div>1 x $25.00</div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total</div>
                <div>$125.00</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Order Details
            </Link>
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
