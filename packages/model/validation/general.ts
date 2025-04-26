import { z } from "zod";

export const phoneSchema = z
  .string()
  .regex(/^\d+$/, { message: "phoneInvalidDigit" })
  .length(10, {
    message: "phoneInvalidLength",
  });
