"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { lockFormSchema } from "./model/schema";

export async function getLocks() {
    return prisma.lock.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getLock(id: number) {
    if (!id) return null;

    return prisma.lock.findUnique({
        where: { id },
    });
}

export async function createLock(prevState: unknown, formData: FormData) {
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

export async function updateLock(prevState: unknown, formData: FormData) {
    const id = (formData.get("id") as string) || "";
    if (!id) {
        return { success: false, error: "Нет id" };
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
        const lock = await prisma.lock.update({
            where: { id: +id },
            data: { name, type },
        });

        revalidatePath("/locks");
        return { success: true, data: lock };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Ошибка обновления" };
    }
}

export async function deleteLock(id: number) {
    if (!id) {
        throw new Error("Нет id");
    }

    await prisma.lock.delete({
        where: { id },
    });
    revalidatePath("/locks");
}
