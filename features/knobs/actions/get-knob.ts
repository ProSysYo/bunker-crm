import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getKnob(id: number) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id замка");
    }
    return prisma.knob.findUnique({
        where: { id },
    });
}
