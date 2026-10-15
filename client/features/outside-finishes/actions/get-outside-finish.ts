import { OutsideFinish } from "../outside-finish-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getOutsideFinish(id: number): Promise<OutsideFinish | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id отделки");
    }

    const outsideFinish = await prisma.outsideFinish.findUnique({
        where: { id },
    });

    return outsideFinish;
}