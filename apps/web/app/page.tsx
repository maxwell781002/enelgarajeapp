import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"
import { Row } from "@repo/ui/components/cardList/row"
import { CardItem } from "@repo/ui/components/cardList/card"

export default function Component() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1">
        <Row>
          <CardItem />
        </Row>
      </main>
      <Footer />
    </div>
  )
}

