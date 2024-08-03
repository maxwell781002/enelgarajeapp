import { Row } from "@repo/ui/components/cardList/row";
import { CardItem } from "@repo/ui/components/cardList/card";
import { getBySlugBusiness } from "@repo/model/repository/category";
import { addToOrder } from "@repo/model/repository/order";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: {
    add?: string;
  };
};

export default async function Page({
  params: { slug },
  searchParams: { add },
}: PageProps) {
  const list = await getBySlugBusiness(slug);
  return (
    <>
      {list.map(({ plates, name, id }) => (
        <Row name={name} key={id}>
          {plates.map((item) => (
            <CardItem
              onAdd={addToOrder.bind(null, item.id)}
              key={item.id}
              description={item.name}
              baseUrl={slug}
              slug={item.slug as string}
              image={item.image}
              price={item.price}
            />
          ))}
        </Row>
      ))}
    </>
  );
}
