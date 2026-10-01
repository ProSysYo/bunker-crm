import { Hinge } from "../hinge-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getHinge(id: number): Promise<Hinge | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id петли");
    }

    const hinge = await prisma.hinge.findUnique({
        where: { id },
    });

    return hinge;
}