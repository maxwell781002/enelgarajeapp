import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Package, ShoppingCart } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Totals() {
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
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">
            +20.1% {t('totalProductsInactive')}
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