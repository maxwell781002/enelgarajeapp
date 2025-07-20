import { BtnServerAction } from "@repo/ui/components/btn-server-action";
import { redirect } from "next/navigation";
import {
  simpleAction,
  actionObject,
  actionFormData,
  withLogging,
} from "@repo/model/repository/to-test-middleware";
import { ZodError } from "zod";

export default function Page() {
  const objectFn = async () => {
    "use server";
    try {
      await actionObject({ name: "test", a: 1 });
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log("error fff", error.errors);
      }
    }
  };
  const formDataFn = async () => {
    "use server";
    try {
      const formData = new FormData();
      formData.append("name", "test");
      await actionFormData(formData);
    } catch (error: any) {
      if (error instanceof ZodError) {
        console.log("error fff", error.errors);
      }
    }
  };
  const loggingFn = async () => {
    "use server";
    const result = await withLogging();
    console.log("result", result);
  };
  return (
    <div>
      <BtnServerAction action={simpleAction}>Simple Action</BtnServerAction>
      <BtnServerAction action={objectFn}>Object</BtnServerAction>
      <BtnServerAction action={formDataFn}>Object formData</BtnServerAction>
      <BtnServerAction action={loggingFn}>Logging</BtnServerAction>
    </div>
  );
  // return redirect("/admin/business");
}
