"use server";
import { requireAuth } from "@/features/auth/auth";
import { lockFormSchema, LockFormValues } from "../model/lock-schema";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ActionResult } from "@/shared/utils/action-types";
import { Lock } from "../types/Lock";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import { handleServerError } from "@/shared/utils/server-error";

export async function createLock(data: LockFormValues): Promise<ActionResult<Lock>> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
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
        const lock = await prisma.lock.create({
            data: {
                name: data.name,
                type: data.type,
            },
        });
        revalidatePath("/locks");
        return { data: lock };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}
