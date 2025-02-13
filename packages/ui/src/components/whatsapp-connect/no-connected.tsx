import { useTranslations } from "next-intl";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import AlertMessage from "@repo/ui/components/alert-message";
import { AlertCircle } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/button";
import { CompleteBusiness } from "@repo/model/zod/business";

export type NoConnectedProps = {
  business: CompleteBusiness;
};

const Form = ({ business }: NoConnectedProps) => {
  const t = useTranslations("Business");
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <Input
          type="tel"
          id="phone"
          placeholder="Enter phone number"
          value={business.phone as string}
          // onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit">{t("whatsapp-connect-btn-connect")}</Button>
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
