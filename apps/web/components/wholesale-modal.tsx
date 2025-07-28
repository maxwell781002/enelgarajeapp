"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { useTranslations } from "next-intl";

export interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string | React.ReactNode;
  variant?: "default" | "destructive";
  isLoading?: boolean;
}

export function WholesaleModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  variant = "default",
  isLoading = false,
}: WholesaleModalProps) {
  const t = useTranslations("Wholesale");
  const [isExpanded, setIsExpanded] = React.useState(false);
  const maxLength = 150;

  const processMessage = (msg: string) => {
    if (typeof msg !== "string") return msg;
    const truncated = isExpanded
      ? msg
      : msg.length > maxLength
        ? `${msg.substring(0, maxLength)}...`
        : msg;
    return truncated.split("\n").map((paragraph, index) => (
      <p key={index} className={index > 0 ? "mt-2" : ""}>
        {paragraph || <br />}
      </p>
    ));
  };

  const isLongMessage =
    typeof message === "string" && message.length > maxLength;
  const displayMessage = processMessage(String(message));

  const handleConfirm = () => {
    onConfirm();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription className="text-left space-y-2">
            <div>
              {displayMessage}
              {isLongMessage && (
                <div className="flex-1 justify-end text-right ">
                  <button
                    onClick={toggleExpand}
                    className="text-blue-600 hover:underline focus:outline-none"
                  >
                    {isExpanded ? t("showLess") : t("showMore")}
                  </button>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                ></div>
                {t("processing")}
              </>
            ) : (
              t("confirmText")
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {t("cancelText")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
