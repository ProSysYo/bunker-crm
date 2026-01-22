import { z } from "zod";

export const padFormSchema = z.object({
  name: z.string().min(3, "Минимум 3 символа"),
  type: z.string().min(1, "Выберите тип замка"),
});

export type PadFormValues = z.infer<typeof padFormSchema>;

