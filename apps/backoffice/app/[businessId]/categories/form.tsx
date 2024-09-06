"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { CategoryModel, CompleteCategory } from "@repo/model/zod/category";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteCategory;
};

const resolver = zodResolver(CategoryModel.omit({ id: true }));

export default function CheckboxReactHookFormSingle({
  action,
  defaultValues,
}: FormAction) {
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({ title: defaultValues?.id ? "Post updated" : "Post created" }),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        Nombre
        <FormField
          control={form.control}
          name="title"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage>{t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
