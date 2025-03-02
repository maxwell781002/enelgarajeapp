import { useTranslations } from "next-intl";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import AlertMessage from "@repo/ui/components/alert-message";
import { AlertCircle } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { phoneSchema } from "@repo/model/validation/general";

export type NoConnectedProps = {
  create: (data: any) => void;
  isCreating: boolean;
};

const Form = ({ create, isCreating }: NoConnectedProps) => {
  const t = useTranslations("Business");
  const [phone, setPhone] = useState();
  const validation = phoneSchema.safeParse(phone).error;
  const errorMessage = validation?.errors.map((error: any) => error.message);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    return create({
      phone,
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
          onChange={(e) => setPhone(e.target.value as any)}
          className="w-full"
        />
        <div className="flex flex-col space-y-2">
          <div className="text-muted-foreground text-sm">
            {t("whatsapp-connect-phone-help")}
          </div>
          {errorMessage && (
            <div className="text-red-500">
              {errorMessage.map((error: any) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button loading={isCreating} type="submit">
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
