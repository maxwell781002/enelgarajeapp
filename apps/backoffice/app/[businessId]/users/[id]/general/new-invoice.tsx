"use client";

import PriceDisplay from "@repo/ui/components/prices/price";
import { useStore } from "../useStore";
import { useTranslations } from "next-intl";
import TransferDialog from "./form-invoice";
import { zodResolver } from "@hookform/resolvers/zod";
import { CollaboratorInvoiceModel } from "@repo/model/zod/collaboratorinvoice";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { Form, FormMessage } from "@repo/ui/components/ui/form";

export type TransferDialogProps = {
  action: (data: any) => any;
};

const defaultValues = {
  transferCode: "",
  businessNota: "",
};
const resolver = zodResolver(CollaboratorInvoiceModel);

export default function NewInvoice() {
  const t = useTranslations("UserDetail");
  const totalToPay = useStore((state) => state.totalToPay());
  const [isOpen, setIsOpen] = useState(false);

  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action: (data: any) => console.log(data),
    defaultValues,
    onSuccess: () =>
      toast({
        title: t("invoiceCreated"),
      }),
  });

  if (!totalToPay) return null;
  return (
    <div className="flex flex-col items-end pt-5">
      <PriceDisplay price={totalToPay} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>{t("createInvoice")}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Details</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <TransferDialog form={form} />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
