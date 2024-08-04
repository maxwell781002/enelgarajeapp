import "@repo/ui/globals.css";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";
import { getBySlug } from "@repo/model/repository/business";
import { CompleteBusiness } from "@repo/model/zod/index";

export default async function SlugLayout({
  children,
  params: { slug },
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const business = (await getBySlug(slug)) as CompleteBusiness;
  return (
    <>
      <Header business={business} />
      <main className="flex-1 container pt-20 md:py-16 lg:py-20">
        {/* <main className="pt-"> */}
        {children}
      </main>
      <Footer />
    </>
  );
}
