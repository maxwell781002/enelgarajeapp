"use client";

import { PropsWithChildren, createContext, useContext } from "react";
import { CompleteBusiness } from "@repo/model/zod/business";

type BusinessProps = {
  business: CompleteBusiness | undefined;
} & PropsWithChildren;

const BusinessContext = createContext<BusinessProps>({
  business: undefined,
});

export const BusinessContextProvider = ({
  children,
  business,
}: BusinessProps) => {
  return (
    <BusinessContext.Provider value={{ business }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw Error(
      "The `useBusinessContext` hook must be called from a descendent of the `BusinessContext`.",
    );
  }

  return ctx;
};
