import { getBySlug } from "@repo/model/repository/product";
import { getTranslations } from "next-intl/server";
import ProductDetail, {
  ProductDetailProps,
} from "@repo/ui/components/product-page/product";
import { ResolvingMetadata } from "next";
import { IProduct } from "@repo/model/types/product";
import { BtnAddCart } from "@repo/ui/components/add-cart";

export type ProductPageProps = {
  productSlug: string;
  locale: string;
} & Omit<ProductDetailProps, "addCartBtn" | "product" | "t">;

export async function generateMetadata(
  productSlug: string,
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

export default async function ProductPage({
  productSlug,
  locale,
  ...props
}: ProductPageProps) {
  const item = await getBySlug(productSlug);
  const t = await getTranslations("Product");
  if (!item) return <div>Not found</div>;
  const btnAdd = (
    <BtnAddCart product={item as IProduct} outOfStock={item._outOfStock} />
  );
  return (
    <ProductDetail
      product={item as IProduct}
      addCartBtn={btnAdd}
      t={t}
      {...props}
    />
  );
}
