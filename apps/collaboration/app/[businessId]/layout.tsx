import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { auth } from "@repo/model/lib/auth";
import { businessMenu } from "../config/menu";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import { getCurrentOrder } from "@repo/model/repository/order";

export default async function RootLayout({
  children,
  params: { businessId },
}: Readonly<{
  children: React.ReactNode;
  params: { businessId: string };
}>) {
  const session = await auth();
  const order = await getCurrentOrder();
  return (
    <TooltipProvider>
      <LayoutMain
        menuItems={businessMenu(businessId)}
        secondaryMenu={[]}
        userImage={session?.user?.image}
        userMenuItems={[]}
        headerExtra={
          <ShoppingCartHeader
            order={order}
            className="flex flex-1 justify-end"
          />
        }
      >
        {children}
      </LayoutMain>
      <Toaster />
    </TooltipProvider>
  );
}
