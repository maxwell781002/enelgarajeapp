"use client";

import { useBusinessContext } from "@repo/ui/context/business";
import { createContext, PropsWithChildren, useState } from "react";
import { WholesaleModal } from "../components/wholesale-modal";
import { useTranslations } from "next-intl";

type WholesaleContextProps = {
  isWholesale: boolean;
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
  const a: any = {};
  const isWholesale = false;
  const [isOpen, setIsOpen] = useState(true);
  const message = t("text");
  return (
    <wholesaleContext.Provider
      {...props}
      value={{
        isWholesale,
        ...props,
      }}
    >
      <WholesaleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
        {...a}
      />
      {children}
    </wholesaleContext.Provider>
  );
};
