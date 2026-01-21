"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { lockFormSchema } from "./model/schema";
import { requireAuth } from "../auth/auth";

export async function getLocks(params?: { search?: string; page?: number; limit?: number }) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }
    
    const { search = "", page = 1, limit = 10 } = params || {};
    const skip = (page - 1) * limit;

    const where = search
        ? {
              OR: [
                  { name: { contains: search, mode: "insensitive" as const } },
                  { type: { contains: search, mode: "insensitive" as const } },
              ],
          }
        : {};

    const [locks, total] = await Promise.all([
        prisma.lock.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.lock.count({ where }),
    ]);

    return {
        locks,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}

export async function getLock(id: number) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    if (!id) return null;

    return prisma.lock.findUnique({
        where: { id },
    });
}

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

export async function updateLock(prevState: unknown, formData: FormData) {
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
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    if (!id) {
        throw new Error("Нет id");
    }

    await prisma.lock.delete({
        where: { id },
    });
    revalidatePath("/locks");
}
