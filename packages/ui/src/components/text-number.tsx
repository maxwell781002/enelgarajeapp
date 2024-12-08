"use client";

import { ChangeEvent } from "react";
import { Input, InputProps } from "@repo/ui/components/ui/input";

export type NumericInputProps = {
  maxLength?: number;
} & InputProps;

export default function NumericInput({
  onChange,
  maxLength,
  value,
  ...props
}: NumericInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue,
      },
    };
    onChange?.(syntheticEvent);
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      id="numeric-input"
      value={value || ""}
      onChange={handleChange}
      {...props}
    />
  );
}
