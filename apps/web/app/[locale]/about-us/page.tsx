import { getCurrentBusiness } from "@repo/model/repository/business";
import { BusinessModel } from "@repo/model/zod/index";
import { z } from "zod";

export default async function Page() {
  const business = (await getCurrentBusiness()) as z.infer<
    typeof BusinessModel
  >;

  return (
    <div className="p-5">
      <p className="">{business.description}</p>
    </div>
  );
}
