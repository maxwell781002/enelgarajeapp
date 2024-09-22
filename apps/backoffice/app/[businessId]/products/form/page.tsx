import BackPage from "@repo/ui/components/back-page";
import ProductForm from "./form";
import { categoryRepository } from "@repo/model/repositories/category";
import { productRepository } from "@repo/model/repositories/product";
import { redirect } from "next/navigation";

type FormAction = {
  params: { businessId: string };
  searchParams: { id?: string };
};

const defaultValues = {
  name: "",
  image: "",
  categoryId: "",
  description: "",
  price: 0,
  offerPrice: 0,
};

export default async function PageForm({
  params: { businessId },
  searchParams: { id },
}: FormAction) {
  const action = async (formData: FormData) => {
    "use server";
    formData.set("businessId", businessId);
    const { id } = formData.get("id")
      ? await productRepository.update(formData)
      : await productRepository.create(formData);
    return redirect(`/${businessId}/products/${id}`);
  };
  const categories = await categoryRepository.getAll(businessId);
  const product = id
    ? await productRepository.get(id as string)
    : { ...defaultValues, businessId };
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
