import { FieldValues, useForm } from "react-hook-form";
import { TErrors, setErrors } from "@repo/ui/lib/form";
import { isFile } from "@repo/model/lib/utils";

type TUseFormProcess = {
  resolver: any;
  defaultValues: any;
  action: (data: any) => void;
  onSuccess?: () => void;
};

export const useFormProcess = <T extends FieldValues>({
  resolver,
  defaultValues,
  action,
  onSuccess,
}: TUseFormProcess) => {
  const form = useForm<T>({
    resolver,
    defaultValues,
  });

  const transformer = (data: any, formData: FormData, parent = "") => {
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) return;
      const field = parent ? `${parent}.${key}` : key;
      if (Object.prototype.toString.call(data[key]) == "[object Object]") {
        return transformer(data[key], formData, field);
      }
      const valueData = isFile(data[key])
        ? data[key]
        : JSON.stringify(data[key]);
      formData.append(field, valueData);
    });
    return formData;
  };

  async function onSubmit(data: any) {
    try {
      const formData = transformer(data, new FormData());
      await action(formData);
      onSuccess && onSuccess();
    } catch (error) {
      setErrors<T, typeof form.setError>(error as TErrors, form.setError);
    }
  }

  return { form, onSubmit };
};
