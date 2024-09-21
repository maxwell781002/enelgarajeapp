import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "es";
  const messages = {
    ...(await import(`../messages/${locale}/categories.json`)).default,
    ...(await import(`../messages/${locale}/products.json`)).default,
    ...(await import(`../messages/${locale}/business.json`)).default,
    ...(await import(`../messages/${locale}/no-have-shop.json`)).default,
    ...(await import(`../messages/${locale}/security.json`)).default,
  };

  return {
    locale,
    messages,
  };
}) as any;
