import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function EmptyProductList() {
  const t = await getTranslations("ProductList");
  return (
    <div className="mx-auto pt-5 text-center">
      <Image
        className="mx-auto mb-6"
        src="/no-search-found.png"
        alt="no-search-found"
        width={211}
        height={184}
      />
      <h1 className="h2 mb-4">{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
