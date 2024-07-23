import * as z from "zod"

export const CategoryModel = z.object({
  id: z.string(),
  name: z.string(),
})
