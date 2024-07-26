import "@repo/ui/globals.css";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";
import { getBySlug } from "@repo/model/repository/business";
import { z } from "zod";
import { BusinessModel } from "@repo/model/zod/index";

export default async function SlugLayout({
  children,
  params: { slug },
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  const business = (await getBySlug(slug)) as z.infer<typeof BusinessModel>;
  return (
    <>
      <Header business={business} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
