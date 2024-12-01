"use client";

import { cn } from "@repo/ui/lib/utils";
import { formatPrice as baseFormatPrice } from "@repo/model/lib/utils";
import { TCurrency } from "@repo/model/types/enums";
import { useBusinessContext } from "@repo/ui/context/business";

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
  currency,
}: PriceDisplayProps) {
  const { business } = useBusinessContext();
  console.log(business?.currency, currency);
  const formatPrice = (amount: number, showAcronym = true) => {
    return (
      amount &&
      baseFormatPrice(amount, currency || business?.currency, {
        showAcronym,
        symbol,
      })
    );
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
