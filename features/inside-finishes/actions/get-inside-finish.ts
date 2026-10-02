import { InsideFinish } from "../inside-finish-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getInsideFinish(id: number): Promise<InsideFinish | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id отделки");
    }

    const insideFinish = await prisma.insideFinish.findUnique({
        where: { id },
    });

    return insideFinish;
}