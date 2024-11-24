import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import { useTranslations } from "next-intl";
import { PaymentMethodDetailByType } from "@repo/ui/components/payment-method/index";
import { useMemo } from "react";

export type DetailProps = {
  data: CompletePaymentMethod;
};

export function Detail({ data }: DetailProps) {
  const t = useTranslations("PaymentMethod");
  const ComponentDetail = useMemo(
    () => PaymentMethodDetailByType[data.type],
    [data.type],
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size="icon">
          <EyeOpenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("detail.title")}</DialogTitle>
          <DialogDescription>{t("detail.description")}</DialogDescription>
        </DialogHeader>
        <ComponentDetail data={data} />
      </DialogContent>
    </Dialog>
  );
}
