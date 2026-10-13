import { Ear } from "../ear-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getEar(id: number): Promise<Ear | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id ушка");
    }

    const ear = await prisma.ear.findUnique({
        where: { id },
    });

    return ear;
}