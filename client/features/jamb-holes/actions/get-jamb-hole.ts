import { JambHole } from "../jamb-hole-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getJambHole(id: number): Promise<JambHole | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id отверстия");
    }

    const jambHole = await prisma.jambHole.findUnique({
        where: { id },
    });

    return jambHole;
}