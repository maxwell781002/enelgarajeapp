import { CompleteBusiness } from "@repo/model/zod/business";
import { getPlanFeature } from "@repo/model/lib/plans-feature";
import { businessSiteRepository } from "@repo/model/repositories/business-site";

export const getSite = async (business: CompleteBusiness) => {
  const site = (
    getPlanFeature("CAN_CONFIGURE_SITE", business) &&
    (await businessSiteRepository.getByBusinessId(business.id))
  );
  return {
    logo: site?.logo?.url || "/logo.png",
    logoFooter: site?.logo?.url || "/logo-name.png",
    email: site?.email || "contacto@enelgaraje.com",
    phone: business?.phone || "(+53) 50586327",
  }
};
