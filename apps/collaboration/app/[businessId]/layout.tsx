import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { auth } from "@repo/model/lib/auth";
import { businessMenu } from "../config/menu";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import { getBusinessSecurity } from "@repo/model/repository/user";
import { redirect } from "next/navigation";
import { UserBusinessType } from "@repo/model/types/enums";
import { Item } from "@repo/ui/components/entity-select";
import { BusinessContextProvider } from "@repo/ui/context/business";
import { businessRepository } from "@repo/model/repositories/business";
import ShopCartSwitch from "./shop-cart-switch";

export default async function RootLayout({
  children,
  params: { businessId },
}: Readonly<{
  children: React.ReactNode;
  params: { businessId: string };
}>) {
  const session = await auth();
  const business = await businessRepository.getById(businessId);
  const businesses = await getBusinessSecurity(
    session?.user,
    businessId,
    UserBusinessType.COLLABORATOR,
  );
  if (businesses === null) {
    return redirect(`/errors/403`);
  }
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };
  return (
    <ShopCartSwitch business={business}>
      <TooltipProvider>
        <BusinessContextProvider business={business}>
          <LayoutMain
            menuItems={businessMenu(businessId)}
            secondaryMenu={[]}
            userImage={session?.user?.image}
            userMenuItems={[]}
            businessId={businessId}
            business={businesses as Item[]}
            onChangeBusiness={onChangeBusiness}
            switchApp
            headerExtra={
              <div className="flex flex-1 justify-end items-center">
                <ShoppingCartHeader
                  className="mr-4"
                  url={`/${businessId}/shopping-cart`}
                />
              </div>
            }
          >
            {children}
          </LayoutMain>
        </BusinessContextProvider>
        <Toaster />
      </TooltipProvider>
    </ShopCartSwitch>
  );
}
