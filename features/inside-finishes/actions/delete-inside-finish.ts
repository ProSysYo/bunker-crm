'use server'
import { routes } from "@/config/navigation";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/shared/utils/action-types";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";

export async function deleteInsideFinish(id: number): Promise<ActionResult<{ id: number }>> {
    const { userId } = await requireAuth();
    if (!userId) {
        return { error: "Не авторизован" };
    }

    if (!id) {
        return { error: "Не указан id записи" };
    }

    try {
        await prisma.insideFinish.delete({ where: { id } });
        revalidatePath(routes.insideFinishes);
        return { data: { id } };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}