import { cn } from "@repo/ui/lib/utils";

interface PriceDisplayProps {
  price: number;
  offerPrice?: number;
  currency?: string;
  className?: string;
}

export default function PriceDisplay({
  price,
  offerPrice,
  currency = "$",
  className,
}: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {offerPrice && offerPrice < price ? (
        <>
          <span
            className="text-lg font-bold text-green-600"
            aria-label="Offer price"
          >
            {currency}
            {formatPrice(offerPrice)}
          </span>
          <span
            className="text-sm text-gray-500 line-through"
            aria-label="Original price"
          >
            {currency}
            {formatPrice(price)}
          </span>
        </>
      ) : (
        <span className="text-lg font-bold" aria-label="Price">
          {currency}
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
