import Commissions from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";
import { useTranslations } from "next-intl";

export type PriceProps = {
  form: any;
};

export default function Price({ form }: PriceProps) {
  const t = useTranslations("Product");
  return (
    <>
      <PriceWidget form={form} />
      <Commissions form={form} />
    </>
  );
}
