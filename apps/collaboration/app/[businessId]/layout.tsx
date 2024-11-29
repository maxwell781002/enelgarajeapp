import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { auth } from "@repo/model/lib/auth";
import { businessMenu } from "../config/menu";
import ShoppingCartHeader from "@repo/ui/components/shop-cart/shopping-cart-header";
import { getCurrentOrder } from "@repo/model/repository/order";
import SwitchApp from "@repo/ui/components/switch-app";
import { ApplicationsNames } from "@repo/model/lib/applications-names";
import { isCurrentUserCollaborator } from "@repo/model/repository/user";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
  params: { businessId },
}: Readonly<{
  children: React.ReactNode;
  params: { businessId: string };
}>) {
  const session = await auth();
  if (!(await isCurrentUserCollaborator(businessId, true))) {
    return redirect(`/errors/403`);
  }
  const order = await getCurrentOrder();
  return (
    <TooltipProvider>
      <LayoutMain
        menuItems={businessMenu(businessId)}
        secondaryMenu={[]}
        userImage={session?.user?.image}
        userMenuItems={[]}
        headerExtra={
          <>
            <div className="flex flex-1 justify-end items-center">
              <SwitchApp
                application={ApplicationsNames.COLLABORATOR}
                className="mr-4"
                businessId={businessId}
              />
              <ShoppingCartHeader
                className="mr-4"
                order={order}
                url={`/${businessId}/shopping-cart`}
              />
            </div>
          </>
        }
      >
        {children}
      </LayoutMain>
      <Toaster />
    </TooltipProvider>
  );
}
