import { Row } from "@repo/ui/components/cardList/row";
import { CardItem } from "@repo/ui/components/cardList/card";
import { getBySlugBusiness } from "@repo/model/repository/category";
import { addToOrder, hasProduct } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const list = await getBySlugBusiness(slug);
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(`/${slug}`);
  };
  return (
    <>
      {list.map(({ plates, name, id }) => (
        <Row name={name} key={id}>
          {plates.map(async (item) => (
            <CardItem
              onAdd={add.bind(null, item.id)}
              key={item.id}
              description={item.name}
              baseUrl={slug}
              slug={item.slug as string}
              image={item.image}
              price={item.price}
              inCart={await hasProduct(item.id)}
            />
          ))}
        </Row>
      ))}
    </>
  );
}
