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
import { Button } from "@repo/ui/components/button";
import { WhatsappConnectStatus } from "@repo/model/types/enums";
import { useToggle } from "@repo/ui/hooks/useToggle";

export type WrapperProps = {
  retrieveCode: () => Promise<CompleteWhatsappConnect>;
  create: (data: any) => Promise<CompleteWhatsappConnect>;
} & Omit<
  ContentProps,
  | "loading"
  | "whatsappConnect"
  | "setWhatsappConnect"
  | "isCreating"
  | "create"
  | "openConnect"
  | "toggleConnect"
> &
  Omit<RemoveWhatsappConnectContentProps, "isRemoving" | "open" | "toggle">;

export default function Wrapper({
  business,
  remove,
  create,
  retrieveCode,
  ...props
}: WrapperProps) {
  const { whatsappConnect, loading, setWhatsappConnect } = useWhatsAppConnect(
    business.id as string,
    business.whatsappConnect as CompleteWhatsappConnect,
  );
  const t = useTranslations("Business");
  const [isRemoving, startRemove] = useTransition();
  const { toast } = useToast();
  const [openRemove, toggleRemove] = useToggle();
  const doRemove = () => {
    return startRemove(async () => {
      await remove();
      setWhatsappConnect(null);
      toggleRemove();
      toast({
        title: t("disconnectWhatsappSuccess"),
      });
    });
  };
  const [openConnect, toggleConnect] = useToggle();
  const [isCreating, startCreate] = useTransition();
  const doCreate = (data: any) => {
    return startCreate(async () => {
      try {
        const newWhatsappConnect = await create(data);
        setWhatsappConnect(newWhatsappConnect);
        toggleConnect();
      } catch (error: any) {
        toast({
          title: t("connectWhatsappError"),
          description: t(error.message),
          variant: "destructive",
        });
      }
    });
  };
  const [isRetrieving, startRetrieve] = useTransition();
  const doRetrieve = () => {
    return startRetrieve(async () => {
      const newWhatsappConnect = await retrieveCode();
      setWhatsappConnect(newWhatsappConnect);
    });
  };
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-1">
          <div className="flex justify-between flex-1 flex-col md:flex-row gap-2">
            <CardTitle>{t("tabWhatsapp")}</CardTitle>
            {whatsappConnect && (
              <div className="flex gap-2">
                {whatsappConnect.status === WhatsappConnectStatus.CODE_SENT && (
                  <Button
                    loading={isRetrieving}
                    variant="default"
                    onClick={doRetrieve}
                    loadingText={t("retrieveCodeBtn")}
                  >
                    {t("retrieveCodeBtn")}
                  </Button>
                )}
                <RemoveWhatsappConnect
                  business={business}
                  remove={doRemove}
                  isRemoving={isRemoving}
                  open={openRemove}
                  toggle={toggleRemove}
                  {...props}
                />
              </div>
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
          openConnect={openConnect}
          toggleConnect={toggleConnect}
          {...props}
        />
      </CardContent>
    </Card>
  );
}
