'use server'

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

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