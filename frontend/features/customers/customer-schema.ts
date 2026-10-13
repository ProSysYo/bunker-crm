import { z } from "zod";

export const customerFormSchema = z.object({
    code: z.string().trim().min(1, "Код обязателен"),
    name: z.string().trim().min(3, "Минимум 3 символа"),
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;