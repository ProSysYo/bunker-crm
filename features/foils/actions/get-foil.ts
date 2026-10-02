import { Foil } from "../foil-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getFoil(id: number): Promise<Foil | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id пленки");
    }

    const foil = await prisma.foil.findUnique({
        where: { id },
    });

    return foil;
}