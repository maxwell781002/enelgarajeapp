import { auth, signIn } from "@repo/model/lib/auth";
import { formatPrice } from "@repo/model/lib/utils";
import { getBySlugWithBusiness } from "@repo/model/repository/product";
import { BtnAddCart } from "./button";
import SigninButton from "@repo/ui/components/signin/button";
import WhatsappButton from "@repo/ui/components/whatsapp-button";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export type PageProps = {
  params: {
    slug: string;
    random: string;
  };
};

export async function generateMetadata({
  params: { slug, random },
}: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  const description = `Precio: ${formatPrice(
    product._price,
    product.business.currency,
  )}, Comisión ${formatPrice(product._commission, product.business.currency)}`;
  return {
    title: product.name,
    description,
    openGraph: {
      images: `/api/product?slug=${slug}&random=${random}`,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  const business = product.business;
  const commission = formatPrice(product._commission, business.currency);
  const price = formatPrice(product._price, business.currency);
  const t = await getTranslations("ProductOnboarding");
  const session = await auth();
  const hasBusiness = !!session?.user?.businessCollaboratorIds?.includes(
    business.id,
  );
  const signInAction = async (provider: string) => {
    "use server";
    await signIn(provider);
  };
  const onShopCardAdd = async () => {
    "use server";
    return redirect(`/${business.id}/shopping-cart`);
  };
  return (
    <div className="container mx-auto px-4 py-8 md:w-2/3">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image.url}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-semibold">{price}</p>
          <p className="text-2xl font-semibold">
            {t("commission")}: {commission}
          </p>
          <p className="text-sm text-gray-500">
            {t("stock")}: {product.stock}
          </p>
          <div className="space-y-4 bg-gray-100 p-4">
            {hasBusiness && (
              <BtnAddCart
                product={product}
                outOfStock={product._outOfStock}
                className="w-full"
                onAdd={onShopCardAdd}
              >
                {t("addToCart")}
              </BtnAddCart>
            )}
            {(!hasBusiness || !session) && (
              <div>
                <p>{t("isNotCollaborator")}</p>
                <WhatsappButton
                  whatsappNumber={business.phone}
                  whatsappMessage={t("chatMessage")}
                  text={t("btnWhatsappSubmit")}
                />
              </div>
            )}
            {!session && (
              <div>
                <p>{t("orLogin")}</p>
                <SigninButton signIn={signInAction} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
