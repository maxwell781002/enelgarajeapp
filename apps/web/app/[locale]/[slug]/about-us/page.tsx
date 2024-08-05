import { getBySlug } from "@repo/model/repository/business";
import { BusinessModel } from "@repo/model/zod/index";
import { z } from "zod";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const business = (await getBySlug(slug)) as z.infer<typeof BusinessModel>;

  return (
    <div className="p-5">
      <p className="">{business.description}</p>
    </div>
  );
}
