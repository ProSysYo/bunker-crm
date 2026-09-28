"use server";

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/shared/utils/action-types";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";

export async function deletePad(id: number): Promise<ActionResult<{ id: number }>> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    if (!id) {
        throw new Error("Нет id");
    }

    try {
        await prisma.pad.delete({
            where: { id },
        });

        revalidatePath("/pads");

        return { data: { id } };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}
