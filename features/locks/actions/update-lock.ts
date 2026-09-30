"use server";
import { requireAuth } from "@/features/auth/auth";
import { lockFormSchema } from "../model/lock-schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Lock, LockCreate } from "../types/Lock";
import { ActionResult } from "@/shared/utils/action-types";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import { handleServerError } from "@/shared/utils/server-error";

export async function updateLock(data: LockCreate & { id: number }): Promise<ActionResult<Lock>> {
    const { userId } = await requireAuth();
    if (!userId) {
        return { error: "Не авторизован" };
    }

    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = lockFormSchema.safeParse({ name: data.name, type: data.type });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const lock = await prisma.lock.update({
            where: { id: data.id },
            data: { name: data.name, type: data.type },
        });

        revalidatePath("/locks");
        return { data: lock };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}
