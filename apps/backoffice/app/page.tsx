import { auth } from "@repo/model/lib/auth";
import { businessRepository } from "@repo/model/repositories/business";
import { UserRoles } from "@repo/model/repositories/user";
import { redirect } from "next/navigation";
import ShopNotHave from "./whatsaap-contact";

export default async function Page() {
  const session = await auth();
  const {
    user: { role, id },
  } = session;
  if (role == UserRoles.ADMIN) {
    return redirect("/dashboard");
  }
  const business = await businessRepository.getByUser(id);
  if (business.length > 0) {
    return redirect(`/${business[0].id}`);
  }

  return <ShopNotHave />;
}
