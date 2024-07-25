import { Row } from "@repo/ui/components/cardList/row";
import { CardItem } from "@repo/ui/components/cardList/card";
import { getBySlugBusiness } from "@repo/model/repository/category";
import Link from "next/link";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const list = await getBySlugBusiness(slug);
  return (
    <>
      {list.map(({ plates, name, id }) => (
        <Row name={name} key={id}>
          {plates.map((item) => (
            <Link key={item.id} href={`/${slug}/${item.slug}`} prefetch={false}>
              <CardItem
                description={item.name}
                image={item.image}
                price={item.price}
              />
            </Link>
          ))}
        </Row>
      ))}
    </>
  );
}
