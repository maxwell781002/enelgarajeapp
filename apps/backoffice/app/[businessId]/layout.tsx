import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { businessMenu, profileMenu, secondaryMenu } from "../config/menu";
import { businessRepository } from "@repo/model/repositories/business";
import { Item } from "@repo/ui/layouts/backoffice/business.switch";
import { redirect } from "next/navigation";
import { auth } from "@repo/model/lib/auth";

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
  const session = await auth();
  const business = await businessRepository.getByUser("");
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };
  return (
    <LayoutMain
      menuItems={businessMenu(businessId)}
      secondaryMenu={secondaryMenu}
      userImage={session?.user?.image}
      userMenuItems={profileMenu}
      breadcrumbItems={breadcrumbItems}
      businessId={businessId}
      ph="Negocio..."
      business={business as Item[]}
      onChangeBusiness={onChangeBusiness}
      adminUrl="/dashboard"
    >
      {children}
    </LayoutMain>
  );
}
