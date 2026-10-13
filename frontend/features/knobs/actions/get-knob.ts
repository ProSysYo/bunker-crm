import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { Knob } from "../types/Knob";

export async function getKnob(id: number): Promise<Knob | null> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id ручки");
    }

    const knob = await prisma.knob.findUnique({
        where: { id },
    });
    return knob;
}
