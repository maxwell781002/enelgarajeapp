import config from "@repo/ui/i18n/index";
export default async () => {
  return await config({ requestLocale: Promise.resolve("es") });
};
