import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"
import { Row } from "@repo/ui/components/cardList/row"
import { CardItem } from "@repo/ui/components/cardList/card"
import { getCardList } from "../actions/cardList"

export default async function Component() {
  const list = getCardList();
  console.log(list);
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        {list.map(({ items, name, id }) => (
          <Row name={name} key={id}>
            {items.map((item) => (
              <CardItem
                key={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                price={item.price}
              />
            ))}
          </Row>
        ))}
      </main>
      <Footer />
    </div>
  )
}

