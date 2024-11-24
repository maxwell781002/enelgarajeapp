"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCollaborationRegisterSchema } from "@repo/model/validation/user";
import { z } from "zod";
import {
  Form as BaseForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useState } from "react";
import { CompleteBusiness } from "@repo/model/zod/business";

export type FromProps = {
  user: any;
  business: CompleteBusiness;
  action: (data: any) => void;
};

export default function Form({
  user: defaultValues,
  business,
  action,
}: FromProps) {
  const t = useTranslations("InvitationLinkForm");
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof UserCollaborationRegisterSchema>>({
    resolver: zodResolver(UserCollaborationRegisterSchema),
    defaultValues,
  });
  const handleForm = async (data: any) => {
    setLoading(true);
    await action(data);
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-background bg-gray-100">
      <Card className="w-full max-w-md m-4">
        <CardHeader>
          <CardTitle>{business?.name}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <BaseForm {...form}>
          <form onSubmit={form.handleSubmit(handleForm)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState: { error } }: any) => (
                    <FormItem>
                      <FormLabel>{t("lbName")}</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder={t("phName")} {...field} />
                      </FormControl>
                      <FormMessage>
                        {!!error?.message && t(error?.message)}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState: { error } }: any) => (
                    <FormItem>
                      <FormLabel>{t("lbPhone")}</FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t("phPhone")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {!!error?.message && t(error?.message)}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loading} type="submit" className="w-full">
                {t("submit")}
              </Button>
            </CardFooter>
          </form>
        </BaseForm>
      </Card>
    </div>
  );
}
