import { getBySlug } from "@repo/model/repository/plate";
import { CheckIcon } from "@repo/ui/components/icons";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import { addToOrder, hasProduct } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";

type PageProps = {
  params: {
    plateSlug: string;
    slug: string;
    locale: string;
  };
};

export default async function Page({
  params: { slug, plateSlug, locale },
}: PageProps) {
  const item = await getBySlug(plateSlug);
  const add = async (productId: string) => {
    "use server";
    addToOrder(productId);
    revalidatePath(`/${locale}/${slug}/${plateSlug}`);
  };

  if (!item) return <div>Not found</div>;

  return (
    <div className="flex flex-col">
      <section className="w-full">
        <img
          src={item.image}
          width={1600}
          height={800}
          alt="Dish"
          className="w-full h-[500px] md:h-[600px] object-cover"
        />
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{item.name}</h1>
            <div className="flex justify-between items-center border-y border-indigo-600 py-2 mb-2">
              <div className="font-semibold mb-1">${item.price}</div>
              <div className="flex justify-end gap-4">
                {(await hasProduct(item.id)) && (
                  <div className="flex items-center gap-2">
                    <div className="bg-red-600 rounded-full p-1">
                      <CheckIcon className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <strong>En el carro</strong>
                  </div>
                )}
                <BtnAddCart action={add.bind(null, item.id)} />
              </div>
            </div>
            <p className="text-muted-foreground text-lg mb-6">
              {item.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-1">{item.category}</h3>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Ingredientes</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              {item.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-12 md:py-16 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Más fotos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {item.images.map((image) => (
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
