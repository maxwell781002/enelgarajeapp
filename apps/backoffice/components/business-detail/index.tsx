import { Edit, CreditCard } from "lucide-react";
import { businessRepository } from "@repo/model/repositories/business";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import Totals from "../../components/totals";
import { productRepository } from "@repo/model/repositories/product";
import { orderRepository } from "@repo/model/repositories/order";
import BusinessDetailWrapper from "./wrapper";
import { UserRoles } from "@repo/model/repositories/user";
import { auth } from "@repo/model/lib/auth";

export default async function BusinessDetail({
  businessId,
}: {
  businessId: string;
}) {
  const session = await auth();
  const business = await businessRepository.getAllBusinessData(businessId);
  const { totalActive, totalInactive } =
    await productRepository.getTotals(businessId);
  const { totalSend, totalPayed, totalReject } =
    await orderRepository.getTotals(businessId);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-1 justify-between">
        <h1 className="text-2xl font-bold">{business.name}</h1>
        <div className="flex items-center space-x-2">
          <Link href={`/${businessId}/business`}>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 cursor-pointer"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          {session?.user?.role === UserRoles.ADMIN && (
            <Link href={`/${businessId}/payment-gateway`}>
              <Button
                variant="outline"
                size="icon"
                className="w-10 h-10 cursor-pointer"
              >
                <CreditCard className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
      <Totals
        productTotal={totalActive}
        productInactive={totalInactive}
        orderToProcess={totalSend}
        orderPayed={totalPayed}
        orderReject={totalReject}
      />
      <BusinessDetailWrapper business={business} />
    </div>
  );
}
