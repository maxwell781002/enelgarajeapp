import { getCategoryBySlug } from "@repo/model/repository/category";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return <div>Not found</div>;
  return redirect(`/?categories=${category.id}`);
}
