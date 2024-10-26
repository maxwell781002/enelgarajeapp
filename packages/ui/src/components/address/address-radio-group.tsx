"use client";

import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Label } from "@repo/ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { Check } from "lucide-react";
import { CompleteAddress } from "@repo/model/prisma/zod/address";

export interface AddressRadioGroupProps {
  addresses: CompleteAddress[];
  defaultValue?: string;
  onChange?: (selectedId: string) => void;
}

export default function AddressRadioGroup({
  addresses,
  onChange,
  ...props
}: AddressRadioGroupProps) {
  return (
    <div className="w-full">
      <RadioGroup
        onValueChange={onChange}
        {...props}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {addresses.map((address) => (
          <div key={address.id} className="relative">
            <RadioGroupItem
              value={address.id}
              id={address.id}
              className="peer sr-only"
              {...props}
            />
            <Label htmlFor={address.id} className="block cursor-pointer">
              <Card className="border-2 transition-all peer-checked:border-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{address.alias}</h3>
                      <p className="text-sm text-muted-foreground">
                        {address.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {address.reference}
                      </p>
                    </div>
                    {(props as any).value === address.id && (
                      <Check className="text-primary" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
