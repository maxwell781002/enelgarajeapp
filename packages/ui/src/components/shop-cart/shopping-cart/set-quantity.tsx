"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/ui/input";
import { Save, RotateCcw } from "lucide-react";
import { MinusIcon, PlusIcon } from "@repo/ui/components/icons";

export type QuantitySetterProps = {
  quantity?: number;
  changeProductQuantity?: (quantity: number) => void;
};

enum Action {
  INCREASE = "increase",
  DECREASE = "decrease",
  UPDATE = "update",
}

export default function QuantitySetter({
  quantity: originalQuantity = 0,
  changeProductQuantity,
}: QuantitySetterProps) {
  const [quantity, setQuantity] = useState(originalQuantity);
  const [isDirty, setIsDirty] = useState(false);
  useEffect(() => {
    setQuantity(originalQuantity);
    setIsDirty(false);
  }, [originalQuantity]);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
    setIsDirty(newQuantity !== originalQuantity);
  };
  const handleReset = () => {
    setQuantity(originalQuantity);
    setIsDirty(false);
  };
  const save = (increment: number, action: Action) => {
    const value = action === Action.UPDATE ? increment : quantity + increment;
    if (value >= 1) {
      changeProductQuantity?.(value);
      setQuantity(value);
      setIsDirty(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2">
        {!isDirty && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => save(-1, Action.DECREASE)}
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        )}
        <Input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-20"
          min={0}
        />
        {!isDirty && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => save(1, Action.INCREASE)}
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        )}
        {isDirty && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              aria-label="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={() => save(quantity, Action.UPDATE)}
              aria-label="Save"
            >
              <Save className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
