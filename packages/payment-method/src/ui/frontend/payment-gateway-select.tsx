"use client";

import { CompletePaymentGateway } from "@repo/model/prisma/zod/paymentgateway";
import { useState } from "react";
import { Label } from "@repo/ui/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";

type SelectPaymentGatewayProps = {
  options: CompletePaymentGateway[];
  name: string;
  form: any;
  value: string;
  onChange: (selected: any) => void;
};

export function SelectPaymentGatewayGroup({
  options,
  value,
  onChange,
}: SelectPaymentGatewayProps) {
  const t = useTranslations("PaymentGateway");
  const handleChange = (type: string) => {
    onChange(type);
  };
  return (
    <div className="w-full">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {t("lbSelectPaymentGateway")}
          </h2>
        </div>
        <RadioGroup
          value={value}
          onValueChange={handleChange}
          className="space-y-3"
        >
          {options.map((option) => (
            <div key={option.id as string} className="relative">
              <Label
                htmlFor={option.id as string}
                className="flex items-start space-x-3 rounded-lg border border-border p-4 cursor-pointer transition-colors hover:bg-accent/50 has-[:checked]:bg-accent has-[:checked]:border-primary"
              >
                <RadioGroupItem
                  id={option.id as string}
                  value={option.type as string}
                  className="mt-1 mr-2 flex-shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <div className="font-medium leading-none">
                    {t(`titles.${option.type}`)}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {t(`select.descriptions.${option.type}`)}
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export default function SelectPaymentGateway({
  form,
  name,
  ...props
}: Omit<SelectPaymentGatewayProps, "onChange" | "value">) {
  const t = useTranslations("PaymentGateway");
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }: any) => (
        <FormItem>
          <FormControl>
            <SelectPaymentGatewayGroup {...props} {...field} />
          </FormControl>
          <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
        </FormItem>
      )}
    />
  );
}
