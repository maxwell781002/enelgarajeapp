"use client";

import React from "react";
import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from "@repo/ui/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";

export type ButtonProps = BaseButtonProps & {
  icon?: React.ElementType;
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
};

export function Button({
  icon: Icon,
  loading = false,
  loadingText = "",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      className={cn("flex items-center gap-2", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="grid grid-flow-col gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <>
          {!!Icon && <Icon className="h-4 w-4" />}
          {children}
        </>
      )}
    </BaseButton>
  );
}
