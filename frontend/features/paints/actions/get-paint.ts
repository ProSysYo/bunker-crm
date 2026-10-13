import { Paint } from "../paint-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getPaint(id: number): Promise<Paint | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id покраски");
    }

    const paint = await prisma.paint.findUnique({
        where: { id },
    });

    return paint;
}