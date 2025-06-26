"use client";
import Markdown from "@repo/ui/components/markdown";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const Tabs = ({
  description,
  moreInfo,
}: {
  description: string;
  moreInfo?: string;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const t = useTranslations("Product");

  return (
    <>
      <div className="border-b-2 relative border-border dark:border-border/40 flex">
        <button
          onClick={() => setSelectedTab(0)}
          className={`${
            selectedTab === 0
              ? "border-t-2 border-l-2 border-r-2 border-b-0 bg-body dark:bg-darkmode-body border-border dark:border-border/40 translate-y-[2px]"
              : "border-transparent"
          } cursor-pointer focus:outline-none px-6 rounded-tl-md rounded-tr-md h-12 py-2 border-t-2 border-l-2 border-r-2 border-b-0`}
        >
          {t("description")}
        </button>
        {moreInfo && (
          <button
            onClick={() => setSelectedTab(1)}
            className={`${
              selectedTab === 1
                ? "border-t-2 border-l-2 border-r-2 border-b-0 border-border dark:border-border/40 bg-body dark:bg-darkmode-body translate-y-[2px]"
                : "border-transparent"
            } cursor-pointer focus:outline-none px-6 rounded-tl-md rounded-tr-md h-12 py-2 border-t-2 border-l-2 border-r-2 border-b-0 ml-8`}
          >
            {t("moreInfo")}
          </button>
        )}
      </div>
      <div className="border-l-2 border-r-2 border-b-2 border-border dark:border-border/40 rounded-bl-md rounded-br-md p-6">
        {selectedTab === 0 && (
          <div className="space-y-4">
            <Markdown>{description}</Markdown>
          </div>
        )}
        {selectedTab === 1 && moreInfo && (
          <div className="space-y-4">
            <Markdown>{moreInfo}</Markdown>
          </div>
        )}
      </div>
    </>
  );
};

export default Tabs;
