import ProductPage, {
  generateMetadata as BaseGenerateMetadata,
  ProductPageProps,
} from "@repo/ui/components/product-page/page";

export async function generateMetadata(
  ...props: Parameters<typeof BaseGenerateMetadata>
) {
  return BaseGenerateMetadata(...props);
}

export default async function Page(props: ProductPageProps) {
  return <ProductPage {...props} />;
}
