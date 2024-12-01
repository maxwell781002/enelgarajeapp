import { cn } from "@repo/ui/lib/utils";
import { formatPrice as baseFormatPrice } from "@repo/model/lib/utils";
import { TCurrency, Currency } from "@repo/model/types/enums";

interface PriceDisplayProps {
  price: number;
  offerPrice?: number;
  symbol?: string;
  className?: string;
  currency?: TCurrency;
}

export default function PriceDisplay({
  price,
  offerPrice,
  symbol = "$",
  className,
  currency = Currency.CUP,
}: PriceDisplayProps) {
  const formatPrice = (amount: number, showAcronym = true) => {
    return amount && baseFormatPrice(amount, currency, { showAcronym, symbol });
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
