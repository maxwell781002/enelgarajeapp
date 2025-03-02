"use client";

import { CompleteWhatsappConnect } from "@repo/model/zod/whatsappconnect";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import Content, {
  ContentProps,
} from "@repo/ui/components/whatsapp-connect/content";
import RemoveWhatsappConnect, {
  RemoveWhatsappConnectContentProps,
} from "@repo/ui/components/whatsapp-connect/remove";
import { useWhatsAppConnect } from "@repo/ui/hooks/whatsapp-connect";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useToast } from "@repo/ui/components/ui/use-toast";

export type WrapperProps = Omit<
  ContentProps,
  "loading" | "whatsappConnect" | "setWhatsappConnect" | "isCreating"
> &
  Omit<RemoveWhatsappConnectContentProps, "isRemoving">;

export default function Wrapper({
  business,
  remove,
  create,
  ...props
}: WrapperProps) {
  const { whatsappConnect, loading, setWhatsappConnect } = useWhatsAppConnect(
    business.id as string,
    business.whatsappConnect as CompleteWhatsappConnect,
  );
  const t = useTranslations("Business");
  const [isRemoving, startRemove] = useTransition();
  const { toast } = useToast();
  const doRemove = (afterRemove?: () => void) => {
    return startRemove(async () => {
      await remove();
      setWhatsappConnect(null);
      afterRemove?.();
      toast({
        title: t("disconnectWhatsappSuccess"),
      });
    });
  };
  const [isCreating, startCreate] = useTransition();
  const doCreate = (data: any) => {
    return startCreate(() => {
      return create(data);
    });
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-1">
          <div className="flex justify-between flex-1">
            <CardTitle>{t("tabWhatsapp")}</CardTitle>
            {whatsappConnect && (
              <RemoveWhatsappConnect
                business={business}
                remove={doRemove}
                isRemoving={isRemoving}
                {...props}
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Content
          business={business}
          whatsappConnect={whatsappConnect}
          loading={loading}
          setWhatsappConnect={setWhatsappConnect}
          create={doCreate}
          isCreating={isCreating}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
