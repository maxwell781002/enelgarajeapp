"use client";
import {
  BtnRemove as BaseBtnRemove,
  BtnRemoveProps as BaseBtnRemoveProps,
} from "@repo/ui/components/ui/btn-remove";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useRouter } from "next/navigation";

export type BtnRemoveProps = Omit<BaseBtnRemoveProps, "action"> & {
  action: (id: any) => any;
  url: string;
};

export default function BtnRemove({ action, url, ...props }: BtnRemoveProps) {
  const { toast } = useToast();
  const router = useRouter();
  const handlerBtn = async () => {
    const result = await action(props.entityId);
    if (result?.error) {
      return toast({
        title: result.error,
        variant: "destructive",
      });
    }
    toast({
      title: "Producto eliminado",
      variant: "default",
    });
    return router.push(url);
  };
  return <BaseBtnRemove action={handlerBtn} {...props} />;
}
