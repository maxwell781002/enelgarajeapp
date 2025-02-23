import { CompleteProduct } from "@repo/model/zod/product";
import SmallCheckButton from "@repo/ui/components/button-check";
import { useStore } from "./store";

export type AddButtonProps = {
  row: CompleteProduct;
};

export default function AddButton({ row }: AddButtonProps) {
  const isProductInList = useStore((state) => state.isProductInList(row));
  const addOrRemoveProduct = useStore((state) => state.addOrRemove);
  return (
    <div className="pr-2">
      <SmallCheckButton
        checked={isProductInList}
        onClick={() => addOrRemoveProduct(row)}
      />
    </div>
  );
}
