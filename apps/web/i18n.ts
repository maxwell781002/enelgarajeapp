import config from "@repo/ui/i18n/index";
import { notFound } from "next/navigation";

const locales = ["en", "es"];

export default ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as any)) notFound();
  return config({ locale: "es" });
};
