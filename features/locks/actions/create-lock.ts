'use server'
import { requireAuth } from "@/features/auth/auth";
import { lockFormSchema } from "../model/schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLock(prevState: unknown, formData: FormData) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const result = lockFormSchema.safeParse({ name, type });
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return {
            success: false,
            error: errors.name?.[0] || errors.type?.[0] || "Ошибка валидации",
            errors,
        };
    }

    try {
        const lock = await prisma.lock.create({
            data: {
                name,
                type,
            },
        });
        revalidatePath("/locks");
        return { success: true, data: lock };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Ошибка создания" };
    }
}