import { getBySlug } from "@repo/model/repository/product";
import { addToOrder } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { AddCart } from "./add-cart";
import ProductDetail from "@repo/ui/components/product-detail";
import { ResolvingMetadata } from "next";
import { IProduct } from "@repo/model/types/product";

type PageProps = {
  params: {
    productSlug: string;
    locale: string;
  };
};

export async function generateMetadata(
  { params: { productSlug } }: PageProps,
  parent: ResolvingMetadata,
) {
  const product = await getBySlug(productSlug);
  const previousImages = (await parent).openGraph?.images || [];
  const image = (product?.image as any)?.downloadUrl;
  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: image ? [image, ...previousImages] : previousImages,
    },
  };
}

export default async function Page({
  params: { productSlug, locale },
}: PageProps) {
  const baseUrl = `/${locale}/${productSlug}`;
  const item = await getBySlug(productSlug);
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };

  const t = await getTranslations("Product");

  if (!item) return <div>Not found</div>;

  const btnAdd = (
    <AddCart product={item as IProduct} add={add.bind(null, item.id)} />
  );

  return <ProductDetail product={item as IProduct} addCartBtn={btnAdd} t={t} />;
}
