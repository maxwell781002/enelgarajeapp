import config from "@repo/ui/i18n/index";
export default async () => {
  const result = await config({ locale: "es" });
  return { ...result, locale: "es" } as any;
};
