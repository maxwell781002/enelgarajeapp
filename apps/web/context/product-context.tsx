"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useTransition,
} from "react";

type ProductContextProps = {
  [key: string]: any;
} & PropsWithChildren;

const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps,
);

export const ProductContextProvider = ({
  children,
  ...props
}: ProductContextProps) => {
  const [isListLoading, startListLoading] = useTransition();
  return (
    <ProductContext.Provider
      {...props}
      value={{
        ...props,
        isListLoading,
        startListLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw Error(
      "The `useProductContext` hook must be called from a descendent of the `ProductContext`.",
    );
  }

  return ctx;
};
