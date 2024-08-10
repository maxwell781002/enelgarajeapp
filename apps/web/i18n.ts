import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "es"];

const config: ReturnType<typeof getRequestConfig> = getRequestConfig(
  async ({ locale }: { locale: string }) => {
    if (!locales.includes(locale as any)) notFound();

    const messages = {
      ...(await import(`./messages/${locale}/shop-cart.json`)).default,
      ...(await import(`./messages/${locale}/product.json`)).default,
      ...(await import(`./messages/${locale}/header.json`)).default,
      ...(await import(`./messages/${locale}/checkout.json`)).default,
      ...(await import(`./messages/${locale}/order.json`)).default,
    };

    return {
      messages,
    };
  },
);

export default config;
