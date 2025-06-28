import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import { CompleteCategory } from "@repo/model/zod/category";
import { useTranslations } from "next-intl";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { useState } from "react";

export type FiltersProps = {
  categories: CompleteCategory[];
  changeFilter: (key: string, value: any) => void;
  value: any;
};

export function Filters({ categories, changeFilter, value }: FiltersProps) {
  const categoriesValues = value?.categories?.split(",") || [];
  const t = useTranslations("Header");
  const [data, setData] = useState({ categories: categoriesValues });
  const handleCheckboxChange = (categoryId: string, value: boolean) => {
    setData((data: any) => {
      const { categories } = data;
      return {
        categories: value
          ? [...categories, categoryId]
          : categories.filter((id: string) => id !== categoryId),
      };
    });
  };
  const handleSubmit = () => {
    return changeFilter("categories", data.categories);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="pl-1 pt-2 cursor-pointer">
          <MixerVerticalIcon className="h-6 w-6" />
          {!!data.categories.length && (
            <span className="relative flex size-2 ml-6 -mt-4">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>{t("filters")}</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 py-4">
          {categories.map((category) => (
            <div key={category.id} className="flex gap-3">
              <Checkbox
                id={category.id}
                name="categories[]"
                value={category.id}
                onCheckedChange={(e: boolean) =>
                  handleCheckboxChange(category.id, e)
                }
                checked={data.categories.includes(category.id)}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          ))}
        </div>
        <SheetFooter className="gap-4">
          <SheetClose asChild>
            <Button onClick={handleSubmit}>{t("apply")}</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline">{t("close")}</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
