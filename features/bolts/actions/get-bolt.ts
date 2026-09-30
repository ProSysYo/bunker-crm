import { Bolt } from "../types/Bolt";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getBolt(id: number): Promise<Bolt | null> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id замка");
    }

    const bolt = await prisma.bolt.findUnique({
        where: { id },
    });
    return bolt;
}
