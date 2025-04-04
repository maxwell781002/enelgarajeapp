import { getProductMessageText } from "@repo/model/lib/product";
import { CompleteProduct } from "@repo/model/zod/product";
import { WhatsappItem } from "@repo/ui/components/social-networks-views/whatsapp";

export default function ProductWhatsapp({
  product,
}: {
  product: CompleteProduct;
}) {
  const messageWhatsapp = getProductMessageText(product);
  return (
    <WhatsappItem
      mediaUrl={(product.image as any)?.url as string}
      message={messageWhatsapp}
    />
  );
}
