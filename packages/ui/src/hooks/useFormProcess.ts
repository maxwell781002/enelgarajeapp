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

  async function onSubmit(data: any) {
    try {
      const formData = new FormData();
      Object.keys(data)
        .filter((key) => !!data[key])
        .forEach((key) => {
          formData.append(key, data[key]);
        });
      await action(formData);
      onSuccess && onSuccess();
    } catch (error) {
      setErrors<T, typeof form.setError>(error as TErrors, form.setError);
    }
  }

  return { form, onSubmit };
};
