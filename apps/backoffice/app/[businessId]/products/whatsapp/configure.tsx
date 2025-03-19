"use client";

import { Button } from "@repo/ui/components/button";
import WhatsAppCard from "./card-item";
import { useStore } from "./store";
import { useTranslations } from "next-intl";
import { DateTimePicker } from "@repo/ui/components/date-widget";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import EntitySelect, { Item } from "@repo/ui/components/entity-select";

export type ConfigureProps = {
  action: (productIds: string[], date: string, chatId: string) => Promise<void>;
  businessId: string;
  chatList: Item[];
};

const resolver = zodResolver(
  z.object({
    date: z.date(),
    chatList: z.string(),
  }),
);

export default function Configure({
  action,
  businessId,
  chatList,
}: ConfigureProps) {
  const products = useStore((state) => state.productList);
  const clear = useStore((state) => state.clear);
  const t = useTranslations("Product");
  const router = useRouter();
  const create = async (formData: FormData) => {
    await action(
      products.map((p) => p.id),
      JSON.parse(formData.get("date") as string),
      JSON.parse(formData.get("chatList") as string),
    );
    clear();
    router.push(`/${businessId}/products`);
  };
  const { toast } = useToast();
  const { form, onSubmit, saving } = useFormProcess({
    resolver,
    action: create,
    defaultValues: {
      date: new Date(),
    },
    onSuccess: () =>
      toast({
        title: t("whatsapp_send_success"),
      }),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sendToWhatsappDialogTitle")}</CardTitle>
        <CardDescription>
          {t("sendToWhatsappDialogDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex mb-5 gap-2 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="date"
                render={({ field, fieldState: { error } }: any) => (
                  <FormItem>
                    <FormControl>
                      <DateTimePicker {...field} />
                    </FormControl>
                    <FormMessage>
                      {!!error?.message && t(error?.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chatList"
                render={({ field, fieldState: { error } }: any) => (
                  <FormItem>
                    <FormControl>
                      <EntitySelect
                        {...field}
                        items={chatList}
                        placeholder={t("phChatList")}
                      />
                    </FormControl>
                    <FormMessage>
                      {!!error?.message && t(error?.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                loading={saving}
                loadingText={t("btnWhatsappSaving")}
              >
                {t("sendToWhatsappDialogBtn")}
              </Button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto pr-4 -mr-4 flex flex-wrap gap-2 justify-center md:justify-start">
              {products.map((product) => (
                <WhatsAppCard key={product.id} product={product} />
              ))}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
