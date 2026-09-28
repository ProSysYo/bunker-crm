import { z } from "zod";
import {} from "../data/lock-types";
import { LOCK_TYPE_VALUES } from "../types/TLockType";

export const lockFormSchema = z.object({
    name: z.string().trim().min(3, "Минимум 3 символа"),
    type: z.enum(LOCK_TYPE_VALUES, { message: "Выберите тип замка" }),
});

export type LockFormValues = z.infer<typeof lockFormSchema>;
