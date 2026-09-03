import { z } from "zod";

export const lockFormSchema = z.object({
  name: z.string().trim().min(3, "Минимум 3 символа"),
  type: z.string().min(1, "Выберите тип замка"),
});

export type LockFormValues = z.infer<typeof lockFormSchema>;

