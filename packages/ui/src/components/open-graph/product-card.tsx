interface OpenGraphCardProps {
  imageUrl: string;
  productName: string;
  price: string;
  commission: string;
  stock: number;
  outOfStock: boolean;
  t: (key: string) => string;
}

export default function ProductOpenGraphCard({
  imageUrl,
  productName,
  price,
  commission,
  stock,
  outOfStock,
  t,
}: OpenGraphCardProps) {
  return (
    <div tw="flex flex-col w-full h-full items-center bg-white">
      <div tw="w-full flex h-64 justify-center">
        <img src={imageUrl} alt={productName} height="100%" />
      </div>
      <div tw="flex flex-col px-4 h-full w-full items-start bg-white">
        <h2 tw="text-2xl font-bold mb-0">{productName}</h2>
        <span tw="text-lg font-semibold">💵 {price}</span>
        <span tw="text-lg font-semibold text-green-700">
          🎁 {t("ProductOpenGraph.commission")}: {commission}
        </span>
        <div tw="flex flex-row text-lg text-gray-600">
          {outOfStock && (
            <span tw="text-red-600">📦 {t("ProductOpenGraph.outOfStock")}</span>
          )}
          {!outOfStock && (
            <span tw="text-green-600">
              📦 {t("ProductOpenGraph.inStock")}: {stock || 0}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
