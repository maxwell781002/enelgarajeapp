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
