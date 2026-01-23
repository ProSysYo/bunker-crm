'use server'

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteLock(id: number) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    if (!id) {
        throw new Error("Нет id");
    }

    await prisma.pad.delete({
        where: { id },
    });
    revalidatePath("/pads");
}