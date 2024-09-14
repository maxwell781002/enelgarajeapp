import { CompleteProduct } from "@repo/model/zod/product";

type ProductDetailProps = {
  product: CompleteProduct;
  addCartBtn?: JSX.Element;
  t: (key: string) => string;
};

export default function ProductDetail({
  product,
  addCartBtn,
  t,
}: ProductDetailProps) {
  return (
    <div className="flex flex-col">
      <section className="w-full">
        <img
          src={product.image}
          width={1600}
          height={800}
          alt="Dish"
          className="w-full h-[500px] md:h-[600px] object-cover"
        />
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="flex justify-between items-center border-y border-indigo-600 py-2 mb-2">
              <div className="font-semibold mb-1">${product.price}</div>
              {addCartBtn}
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              {product.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {product.category?.name}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">{t("photos")}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {product.images.map((image) => (
            <img
              key={image}
              src={image}
              width={600}
              height={400}
              alt="Dish"
              className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
