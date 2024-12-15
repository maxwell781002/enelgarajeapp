import BackPage from "@repo/ui/components/back-page";
import ProductForm from "./form";
import { categoryRepository } from "@repo/model/repositories/category";
import { productRepository } from "@repo/model/repositories/product";
import { redirect } from "next/navigation";
import { formDataToObject } from "@repo/model/lib/utils";
import { getBusinessById } from "@repo/model/repository/business";
import { isLimited } from "@repo/model/repository/product";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";
import { getTranslations } from "next-intl/server";
import { CommissionTypes } from "@repo/model/types/enums";
import { ProductRegister } from "@repo/model/validation/product";

type FormAction = {
  params: { businessId: string };
  searchParams: { id?: string };
};

const priceValues = {
  hasCommission: false,
  commissionType: CommissionTypes.PERCENTAGE,
  commissionValue: 0,
};

const defaultValues: ProductRegister = {
  name: "",
  image: "",
  categoryId: "",
  description: "",
  price: 0,
  offerPrice: 0,
  active: true,
  isNew: false,
  priority: 0,
  stock: 0,
  isExhaustible: false,
  allowOrderOutOfStock: false,
  priceValues,
};

export default async function PageForm({
  params: { businessId },
  searchParams: { id },
}: FormAction) {
  const business = await getBusinessById(businessId);
  const t = await getTranslations("Product");
  // If we have business, is new object and is limited
  if (business && !id && (await isLimited(business))) {
    return <UpgradePlan business={business} title={t("upgrade_plan_title")} />;
  }
  const action = async (formData: FormData) => {
    "use server";
    const obj = formDataToObject(formData) as any;
    if (!obj.categoryId) {
      delete obj.categoryId;
    }
    obj.businessId = businessId;
    const { id: idFromDb } = id
      ? await productRepository.update(id, obj)
      : await productRepository.create(obj);
    return redirect(`/${businessId}/products/${idFromDb}`);
  };
  const categories = await categoryRepository.getAll(businessId);
  const product = id
    ? await productRepository.getAllProduct({ id })
    : { ...defaultValues, businessId };
  product.priceValues = product.priceValues || priceValues;
  if (product.priceValues.commissionValue) {
    product.priceValues.hasCommission = !!product.priceValues.commissionValue;
  }
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <ProductForm
        defaultValues={product}
        categories={categories}
        action={action}
      />
    </BackPage>
  );
}
