import { isFile } from "@repo/model/lib/utils";
import { FieldValues, UseFormSetError } from "react-hook-form";

export type TErrors = {
  message: string;
};

type TIssues = [
  {
    path: string[];
    message: string;
  },
];

export function setErrors<F extends FieldValues, T extends UseFormSetError<F>>(
  errors: TErrors,
  setError: T,
) {
  const issues: TIssues = JSON.parse(errors.message);
  issues.forEach(({ path, message }) =>
    setError(path.join(".") as any, { message }),
  );
}

export function formDataToObject(formData: FormData) {
  const computeObject = (data: any, parts: string[], value: any): any => {
    const field = parts.shift() as string;
    if (parts.length === 0) {
      const valueData = isFile(value) ? value : JSON.parse(value);
      return { [field]: valueData };
    }
    const currentData = data[field] || {};
    const newValue = computeObject(currentData, parts, value);
    return {
      [field]: { ...newValue, ...currentData },
    };
  };
  return Object.entries(Object.fromEntries(formData.entries())).reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...computeObject(acc, key.split("."), value),
    }),
    {},
  );
}
