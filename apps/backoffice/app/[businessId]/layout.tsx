import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { businessMenu, profileMenu, secondaryMenu } from "../config/menu";
import { businessRepository } from "@repo/model/repositories/business";
import { Item } from "@repo/ui/layouts/backoffice/business.switch";
import { redirect } from "next/navigation";
import { auth } from "@repo/model/lib/auth";
import { UserRoles } from "@repo/model/repositories/user";

export default async function RootLayout({
  children,
  params: { businessId },
}: {
  children: React.ReactNode;
  params: { businessId: string };
}) {
  const session = await auth();
  const business =
    session?.user.role === UserRoles.ADMIN
      ? [await businessRepository.getById(businessId)]
      : await businessRepository.getByUserAndActive(session?.user?.id);
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
      businessId={businessId}
      ph="Negocio..."
      business={business as Item[]}
      onChangeBusiness={onChangeBusiness}
      adminUrl={
        session?.user?.role === UserRoles.ADMIN ? "/admin/dashboard" : ""
      }
    >
      {children}
    </LayoutMain>
  );
}
