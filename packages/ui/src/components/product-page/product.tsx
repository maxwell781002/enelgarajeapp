import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import Markdown from "@repo/ui/components/markdown";
import ProductBadge from "@repo/ui/components/product-badge";
import { IProduct } from "@repo/model/types/product";

type ProductDetailProps = {
  product: IProduct;
  addCartBtn?: JSX.Element;
  t: (key: string) => string;
};

export default function ProductDetail({
  product,
  addCartBtn,
  t,
}: ProductDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Image */}
        <div className="w-full aspect-square relative">
          <Image
            src={product.image}
            alt={product.name}
            objectFit="cover"
            className="rounded-lg"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {product.name}
          </h1>
          <ProductBadge product={product} className="mb-2" />
          <div className="flex justify-between items-center border-y border-indigo-600 py-2 mb-2">
            <div className="font-semibold mb-1">
              <PriceDisplay
                price={product.price}
                offerPrice={product.offerPrice as number}
              />
            </div>
            {addCartBtn}
          </div>
          <div>
            <Markdown>{product.description}</Markdown>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-1">
                {product.category?.name}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
