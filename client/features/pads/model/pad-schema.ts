import { z } from "zod";
import { PAD_TYPE_VALUES } from "../types/PadType";

export const padFormSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа"),
  type: z.enum(PAD_TYPE_VALUES, { message: "Выберите тип накладки" }),
});

export type PadFormValues = z.infer<typeof padFormSchema>;

