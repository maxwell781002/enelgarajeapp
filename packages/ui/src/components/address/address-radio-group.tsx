"use client";

import { Label } from "@repo/ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { CompleteAddress } from "@repo/model/prisma/zod/address";
import { useCallback } from "react";
import AddressCard from "./card";

export interface AddressRadioGroupProps {
  addresses: CompleteAddress[];
  defaultValue?: string;
  onChange?: (selected: any) => void;
}

export default function AddressRadioGroup({
  addresses,
  onChange,
  ...props
}: AddressRadioGroupProps) {
  const handleChange = useCallback((id: string) => {
    const value = addresses.find((address) => address.id === id);
    onChange?.(value);
  }, []);

  return (
    <div className="w-full">
      <RadioGroup
        onValueChange={handleChange}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {addresses.map((address) => (
          <div key={address.id} className="relative">
            <RadioGroupItem
              value={address.id}
              id={address.id}
              className="peer sr-only"
            />
            <Label htmlFor={address.id} className="block cursor-pointer">
              <AddressCard
                address={address}
                selected={(props as any).value?.id === address.id}
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
