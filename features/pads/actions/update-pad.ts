"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { padFormSchema } from "../model/schema";
import { requireAuth } from "@/features/auth/auth";

export async function updatePad(prevState: unknown, formData: FormData) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    const id = (formData.get("id") as string) || "";
    if (!id) {
        return { success: false, error: "Нет id" };
    }

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;

    const result = padFormSchema.safeParse({ name, type });
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return {
            success: false,
            error: errors.name?.[0] || errors.type?.[0] || "Ошибка валидации",
            errors,
        };
    }

    try {
        const pad = await prisma.pad.update({
            where: { id: +id },
            data: { name, type },
        });

        revalidatePath("/pads");
        return { success: true, data: pad };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Ошибка обновления" };
    }
}