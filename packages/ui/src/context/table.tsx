"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useTransition,
} from "react";

type TableProps = {
  [key: string]: any;
} & PropsWithChildren;

const TableContext = createContext<TableProps>({} as TableProps);

export const TableContextProvider = ({ children, ...props }: TableProps) => {
  const [isListLoading, startListLoading] = useTransition();
  return (
    <TableContext.Provider
      {...props}
      value={{
        ...props,
        isListLoading,
        startListLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw Error(
      "The `useTableContext` hook must be called from a descendent of the `TableContext`.",
    );
  }

  return ctx;
};
