import { Model } from "../model-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getModel(id: number): Promise<Model | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id модели");
    }

    const model = await prisma.model.findUnique({
        where: { id },
    });

    return model;
}