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
  classNameText?: string;
  currency?: TCurrency;
}

export default function PriceDisplay({
  price,
  offerPrice,
  symbol = "$",
  className,
  classNameText,
  currency,
}: PriceDisplayProps) {
  const { business } = useBusinessContext();
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
            className={cn("text-lg font-bold text-green-600", classNameText)}
            aria-label="Offer price"
          >
            {formatPrice(offerPrice)}
          </span>
          <span
            className={cn("text-sm text-gray-500 line-through", classNameText)}
            aria-label="Original price"
          >
            {formatPrice(price, false)}
          </span>
        </>
      ) : (
        <span
          className={cn("text-lg font-bold", classNameText)}
          aria-label="Price"
        >
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
