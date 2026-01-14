"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    try {
        const lock = await prisma.lock.create({
            data: {
                name: formData.get("name") as string,
                type: (formData.get("type") as string),
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
    try {
        const id = (formData.get("id") as string) || "";
        if (!id) {
            return { success: false, error: "Нет id" };
        }
        const data = {
            name: (formData.get("name") as string) ,
            type: (formData.get("type") as string),
        };

        const lock = await prisma.lock.update({
            where: { id: +id },
            data,
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
