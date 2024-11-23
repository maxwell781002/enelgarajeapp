import { getRequestConfig } from "next-intl/server";

const config: ReturnType<typeof getRequestConfig> = getRequestConfig(
  async ({ locale }: { locale: string }) => {
    const messages = {
      ...(await import(`./messages/${locale}/shop-cart.json`)).default,
      ...(await import(`./messages/${locale}/product.json`)).default,
      ...(await import(`./messages/${locale}/header.json`)).default,
      ...(await import(`./messages/${locale}/checkout.json`)).default,
      ...(await import(`./messages/${locale}/order.json`)).default,
      ...(await import(`./messages/${locale}/security.json`)).default,
      ...(await import(`./messages/${locale}/payment-method.json`)).default,
      ...(await import(`./messages/${locale}/address.json`)).default,
      ...(await import(`./messages/${locale}/errors-page.json`)).default,
      ...(await import(`./messages/${locale}/invitation-link.json`)).default,
    };

    return {
      locale,
      messages,
    };
  },
);

export default config;
