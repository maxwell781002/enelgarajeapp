import { FieldValues, useForm } from "react-hook-form";
import { TErrors, setErrors } from "../lib/form";

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
    Object.keys(data)
      .filter((key) => !!data[key] || typeof data[key] === "boolean")
      .forEach((key) => {
        const field = parent ? `${parent}.${key}` : key;
        if (Object.prototype.toString.call(data[key]) == "[object Object]") {
          return transformer(data[key], formData, field);
        }
        formData.append(field, JSON.stringify(data[key]));
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
