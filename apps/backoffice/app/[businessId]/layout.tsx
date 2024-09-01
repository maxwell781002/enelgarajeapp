import "@repo/ui/globals.css";
import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { mainMenu, profileMenu, secondaryMenu } from "../config/menu";
import { businessRepository } from "@repo/model/repositories/business";
import { Item } from "@repo/ui/layouts/backoffice/business.switch";
import { redirect } from "next/navigation";

// Only for testing
const breadcrumbItems = [
  {
    title: "Dashboard",
    link: "/",
  },
  {
    title: "Acme Inc",
    link: "/post",
  },
];

export default async function RootLayout({
  children,
  params: { businessId },
}: {
  children: React.ReactNode;
  params: { businessId: string };
}) {
  const business = await businessRepository.getByUser("");
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };
  return (
    <>
      <TooltipProvider>
        <LayoutMain
          menuItems={mainMenu(businessId)}
          secondaryMenu={secondaryMenu}
          userImage="/placeholder-user.jpg"
          userMenuItems={profileMenu}
          breadcrumbItems={breadcrumbItems}
          businessId={businessId}
          ph="Negocio..."
          business={business as Item[]}
          onChangeBusiness={onChangeBusiness}
        >
          {children}
        </LayoutMain>
        <Toaster />
      </TooltipProvider>
    </>
  );
}
