import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Package, ShoppingCart } from "lucide-react"
import { getTranslations } from "next-intl/server"

export type TotalsProps = {
  productTotal: number,
  productInactive: number,
}

export default async function Totals({
  productTotal,
  productInactive,
}: TotalsProps) {
  const t = await getTranslations('Totals')
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("totalProducts")}
          </CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {productTotal}
          </div>
          <p className="text-xs text-muted-foreground">
            {!!productInactive && `+ ${productInactive} ${t('totalProductsInactive')}`}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t("orderToProcess")}
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23,456</div>
          <p className="text-xs text-muted-foreground">
            +15.2% {t('totalOrders')}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}