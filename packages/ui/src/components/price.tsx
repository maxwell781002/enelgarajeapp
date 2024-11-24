import { cn } from "@repo/ui/lib/utils";
import { formatPrice as baseFormatPrice } from "@repo/model/lib/utils";

interface PriceDisplayProps {
  price: number;
  offerPrice?: number;
  currency?: string;
  className?: string;
  acronym?: string;
}

export default function PriceDisplay({
  price,
  offerPrice,
  currency = "$",
  className,
  acronym = "CUP",
}: PriceDisplayProps) {
  const formatPrice = (amount: number, showAcronym = true) => {
    return amount && baseFormatPrice(amount, showAcronym, currency, acronym);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {offerPrice && offerPrice < price ? (
        <>
          <span
            className="text-lg font-bold text-green-600"
            aria-label="Offer price"
          >
            {formatPrice(offerPrice)}
          </span>
          <span
            className="text-sm text-gray-500 line-through"
            aria-label="Original price"
          >
            {formatPrice(price, false)}
          </span>
        </>
      ) : (
        <span className="text-lg font-bold" aria-label="Price">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
