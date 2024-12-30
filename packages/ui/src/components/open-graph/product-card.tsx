interface OpenGraphCardProps {
  imageUrl: string;
  productName: string;
  description: string;
  price: string;
  commission: string;
  stock: number;
  outOfStock: boolean;
  t: (key: string) => string;
}

export default function ProductOpenGraphCard({
  imageUrl,
  productName,
  description,
  price,
  commission,
  stock,
  outOfStock,
  t,
}: OpenGraphCardProps) {
  return (
    <div tw="flex flex-col w-full h-full items-center bg-white">
      <img src={imageUrl} alt={productName} height={250} />
      <div tw="flex flex-col p-4">
        <h2 tw="text-2xl font-bold mb-2">{productName}</h2>
        <p tw="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div tw="flex flex-row justify-between items-center mb-2">
          <span tw="text-xl font-semibold">{price}</span>
          <div tw="flex flex-row px-2 py-1 border-2 border-green-600 text-green-700 text-sm rounded-full">
            {t("ProductOpenGraph.commission")}: {commission}
          </div>
        </div>
        <div tw="flex flex-row text-sm text-gray-600">
          {outOfStock && (
            <span tw="text-red-600">{t("ProductOpenGraph.outOfStock")}</span>
          )}
          {!outOfStock && stock > 0 && (
            <span tw="text-green-600">
              {t("ProductOpenGraph.inStock")}: {stock}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
