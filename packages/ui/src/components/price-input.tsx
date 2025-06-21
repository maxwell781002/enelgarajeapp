import React, { forwardRef } from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@repo/ui/lib/utils";

type PriceFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const PriceMask = forwardRef<any, any>(function PriceMask(props, ref) {
  const { value, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Number}
      scale={2}
      radix="."
      mapToRadix={["."]}
      padFractionalZeros
      min={0}
      thousandsSeparator=","
      inputRef={ref}
      value={(value / 100)?.toString() || ""}
    />
  );
});

export default function PriceInput({
  className,
  onChange,
  onBlur,
  ...props
}: PriceFieldProps) {
  const createEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
    baseMethod: any | undefined,
  ) => {
    const value = e.target.value;
    let priceInCents = 0;
    if (value !== "") {
      const cleanedValue = parseFloat(value.replace(/,/g, ""));
      priceInCents = Math.round(cleanedValue * 100);
    }
    baseMethod?.({
      target: { value: priceInCents },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return createEvent(e, onChange);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    return createEvent(e, onBlur);
  };
  return (
    <PriceMask
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}
