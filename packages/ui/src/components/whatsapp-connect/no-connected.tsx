import { useTranslations } from "next-intl";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import AlertMessage from "@repo/ui/components/alert-message";
import { AlertCircle } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/button";
import { CompleteBusiness } from "@repo/model/zod/business";
import { useState, useTransition } from "react";

export type NoConnectedProps = {
  business: CompleteBusiness;
  action: (data: any) => Promise<any>;
};

const Form = ({ business, action }: NoConnectedProps) => {
  const t = useTranslations("Business");
  const [phone, setPhone] = useState(business.phone as string);
  const [loading, startTransition] = useTransition();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    return startTransition(() => {
      return action({
        phone,
        businessId: business.id,
      });
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          {t("whatsapp-connect-phone-lb")}
        </label>
        <Input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button loading={loading} type="submit">
          {t("whatsapp-connect-btn-connect")}
        </Button>
      </div>
    </form>
  );
};

export default function NoConnected(props: NoConnectedProps) {
  const t = useTranslations("Business");
  return (
    <div>
      <div className="flex justify-end pb-4">
        <BtnDialogForm
          btnVariant="default"
          btnText={t("btnWhatsappConnect")}
          Component={Form}
          {...props}
        />
      </div>
      <AlertMessage
        Icon={AlertCircle}
        text={t("whatsappNotConnect")}
        className="flex items-center p-4 text-yellow-800 bg-yellow-100 rounded-lg"
      />
    </div>
  );
}
