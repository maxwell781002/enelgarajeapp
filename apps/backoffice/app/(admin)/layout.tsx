import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { coreMenu, profileMenu, secondaryMenu } from "../config/menu";
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
}: {
  children: React.ReactNode;
}) {
  const {
    user: { image },
  } = await auth();
  const onChangeBusiness = async (businessId: string) => {
    "use server";
    await redirect(`/${businessId}`);
  };
  return (
    <LayoutMain
      menuItems={coreMenu}
      secondaryMenu={secondaryMenu}
      userImage={image}
      userMenuItems={profileMenu}
      breadcrumbItems={breadcrumbItems}
      ph="Negocio..."
      onChangeBusiness={onChangeBusiness}
    >
      {children}
    </LayoutMain>
  );
}
