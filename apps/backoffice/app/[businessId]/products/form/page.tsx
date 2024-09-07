import { CompleteProduct } from "@repo/model/zod/product";
import BackPage from "@repo/ui/components/back-page";
import ProductForm from "./form";
import { categoryRepository } from "@repo/model/repositories/category";
import { productRepository } from "@repo/model/repositories/product";
import { redirect } from "next/navigation";

type FormAction = {
  action: (object: any) => Promise<any>;
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
  const action = async (props: any) => {
    "use server";
    const { id } = await productRepository.create({ ...props, businessId });
    return redirect(`/${businessId}/products/${id}`);
  };
  const categories = await categoryRepository.getAll(businessId);
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <ProductForm
        defaultValues={{ ...defaultValues, businessId } as CompleteProduct}
        categories={categories}
        action={action}
      />
    </BackPage>
  );
}
