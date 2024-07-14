import { Row } from "@repo/ui/components/cardList/row"
import { CardItem } from "@repo/ui/components/cardList/card"
import { getCardList } from "../actions/cardList"
import Link from "next/link"

export default async function Component() {
  const list = getCardList();
  return (
    <>
      {list.map(({ items, name, id }) => (
        <Row name={name} key={id}>
          {items.map((item) => (
            <Link key={item.id} href={`/${item.id}`} prefetch={false}>
              <CardItem
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
              />
            </Link>
          ))}
        </Row>
      ))}
    </>
  )
}

