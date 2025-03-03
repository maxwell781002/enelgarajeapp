import {
  connectWhatsapp,
  removeInstanceByBusinessId,
  retrieveCodeByBusinessId,
} from "@repo/model/repository/whatsapp-connect";
import Wrapper, {
  WrapperProps,
} from "@repo/ui/components/whatsapp-connect/wrapper";

export function WhatsappConnect({
  business,
  ...props
}: Omit<WrapperProps, "create" | "remove" | "retrieveCode">) {
  const doConnect = async ({ phone }: any) => {
    "use server";
    return connectWhatsapp(business.id as string, phone);
  };
  const doRemove = async () => {
    "use server";
    return removeInstanceByBusinessId(business.id as string);
  };
  const doRetrieveCode = async () => {
    "use server";
    return retrieveCodeByBusinessId(business.id as string);
  };
  return (
    <Wrapper
      {...props}
      create={doConnect}
      remove={doRemove}
      retrieveCode={doRetrieveCode}
      business={business}
    />
  );
}
