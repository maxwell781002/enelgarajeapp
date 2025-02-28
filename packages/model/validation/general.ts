import { z } from "zod";

export const phoneSchema = z.string().length(10, {
  message: "Debe tener exactamente 10 dígitos",
}).regex(/^\d+$/, { message: "Debe contener solo dígitos" });
