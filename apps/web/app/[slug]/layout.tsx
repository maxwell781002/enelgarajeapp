import "@repo/ui/globals.css";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

export default function SlugLayout({
  children,
  params: { slug },
}: Readonly<{
  children: React.ReactNode;
  params: { slug: string };
}>) {
  return (
    <>
      <Header slug={slug} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
