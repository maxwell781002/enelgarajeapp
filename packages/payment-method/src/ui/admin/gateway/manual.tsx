import BaseGatewayAdminForm, { BaseGatewayAdminFormType } from "../base-form";

export default function ManualAdminForm(
  props: Omit<BaseGatewayAdminFormType, "children">,
) {
  return <BaseGatewayAdminForm {...props} />;
}
