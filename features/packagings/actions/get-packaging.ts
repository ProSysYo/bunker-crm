import { Packaging } from "../packaging-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getPackaging(id: number): Promise<Packaging | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id упаковки");
    }

    const packaging = await prisma.packaging.findUnique({
        where: { id },
    });

    return packaging;
}