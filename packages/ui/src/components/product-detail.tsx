import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import Markdown from "./markdown";
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

    // <div className="flex flex-col">
    //   <section className="w-full">
    //     <Image
    //       src={product.image}
    //       alt={product.name}
    //       width={0}
    //       height={0}
    //       sizes="100vw"
    //       style={{ width: "100%", height: "auto" }}
    //     />
    //   </section>
    //   <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
    //     <div className="grid md:grid-cols-2 gap-8">
    //       <div>
    //         <h1 className="text-3xl md:text-4xl font-bold mb-4">
    //           {product.name}
    //         </h1>
    //         <ProductBadge product={product} className="mb-2" />
    //         <div className="flex justify-between items-center border-y border-indigo-600 py-2 mb-2">
    //           <div className="font-semibold mb-1">
    //             <PriceDisplay
    //               price={product.price}
    //               offerPrice={product.offerPrice as number}
    //             />
    //           </div>
    //           {addCartBtn}
    //         </div>
    //         <div>
    //           <Markdown>{product.description}</Markdown>
    //         </div>
    //         <div className="grid grid-cols-2 gap-4 mb-8">
    //           <div>
    //             <h3 className="text-lg font-semibold mb-1">
    //               {product.category?.name}
    //             </h3>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   {product.images?.length > 0 && (
    //     <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
    //       <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("photos")}</h2>
    //       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
    //         {product.images.map((image) => (
    //           <Image
    //             key={image}
    //             src={image}
    //             width={600}
    //             height={400}
    //             alt="Dish"
    //             className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
    //           />
    //         ))}
    //       </div>
    //     </section>
    //   )}
    // </div>
  );
}
