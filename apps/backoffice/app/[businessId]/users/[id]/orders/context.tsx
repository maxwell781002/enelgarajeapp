"use client";

import { useStore } from "../useStore";

export default function OrdersContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const clearAll = useStore((state) => state.clearAll);
  clearAll();
  return children;
}
