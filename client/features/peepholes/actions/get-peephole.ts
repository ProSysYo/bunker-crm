import { Peephole } from "../peephole-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getPeephole(id: number): Promise<Peephole | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id глазка");
    }

    const peephole = await prisma.peephole.findUnique({
        where: { id },
    });

    return peephole;
}