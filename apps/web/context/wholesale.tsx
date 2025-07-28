"use client";

import { useBusinessContext } from "@repo/ui/context/business";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { WholesaleModal } from "../components/wholesale-modal";
import { useTranslations } from "next-intl";

export enum IS_WHOLESALE {
  YES,
  NO,
  NO_CONFIGURED,
}

type WholesaleContextProps = {
  wholesale: IS_WHOLESALE;
};

const wholesaleContext = createContext<WholesaleContextProps>(
  {} as WholesaleContextProps,
);

export const WholesaleContextProvider = ({
  children,
  ...props
}: PropsWithChildren) => {
  const { business } = useBusinessContext();
  const t = useTranslations("WholesaleModal");
  const [isWholesale, setIsWholesale] = useState<string | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("isWholesale");
      setIsWholesale(storedValue);
      setIsOpen(storedValue === null);
    }
  }, []);
  const onConfirm = () => {
    setIsOpen(false);
    localStorage.setItem("isWholesale", "true");
    setIsWholesale("true");
  };
  const onCancel = () => {
    setIsOpen(false);
    localStorage.setItem("isWholesale", "false");
    setIsWholesale("false");
  };
  const wholesale =
    isWholesale === null
      ? IS_WHOLESALE.NO_CONFIGURED
      : isWholesale === "true"
        ? IS_WHOLESALE.YES
        : IS_WHOLESALE.NO;
  return (
    <wholesaleContext.Provider
      {...props}
      value={{
        wholesale,
        ...props,
      }}
    >
      {!!business?.hasWholesaleMode && (
        <WholesaleModal
          isOpen={isOpen}
          onClose={onCancel}
          message={t("text")}
          onConfirm={onConfirm}
        />
      )}
      {children}
    </wholesaleContext.Provider>
  );
};
