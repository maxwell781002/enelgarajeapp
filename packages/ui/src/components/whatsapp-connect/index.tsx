import {
  connectWhatsapp,
  removeInstanceByBusinessId,
} from "@repo/model/repository/whatsapp-connect";
import Wrapper, {
  WrapperProps,
} from "@repo/ui/components/whatsapp-connect/wrapper";

export function WhatsappConnect({
  business,
  ...props
}: Omit<WrapperProps, "create" | "remove">) {
  const doConnect = async ({ phone }: any) => {
    "use server";
    console.log("doConnect", business.id, phone);
    return connectWhatsapp(business.id as string, phone);
  };
  const doRemove = async () => {
    "use server";
    return removeInstanceByBusinessId(business.id as string);
  };
  return (
    <Wrapper
      {...props}
      create={doConnect}
      remove={doRemove}
      business={business}
    />
  );
}
