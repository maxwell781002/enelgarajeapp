import { BtnServerAction } from "@repo/ui/components/btn-server-action";
import { redirect } from "next/navigation";
import { toTestMiddleware } from "@repo/model/repository/to-test-middleware";

export default function Page() {
  return (
    <div>
      <BtnServerAction action={toTestMiddleware}>aaaaa</BtnServerAction>
    </div>
  );
  // return redirect("/admin/business");
}
