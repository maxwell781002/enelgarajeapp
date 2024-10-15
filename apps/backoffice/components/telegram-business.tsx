import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";

export type TelegramBusinessProps = {
  form: any;
};

export default function TelegramBusiness({ form }: TelegramBusinessProps) {
  const t = useTranslations("Business");

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="telegram.groupId"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbGroupId")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phGroupId")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telegram.invitationLink"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbInvitationLink")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phInvitationLink")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
