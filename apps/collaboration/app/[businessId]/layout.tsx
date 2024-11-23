import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { auth } from "@repo/model/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <TooltipProvider>
      <LayoutMain
        menuItems={[]}
        secondaryMenu={[]}
        userImage={session?.user?.image}
        userMenuItems={[]}
      >
        {children}
      </LayoutMain>
      <Toaster />
    </TooltipProvider>
  );
}
