'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { InsideFinish, InsideFinishCreate } from "../inside-finish-types";
import { requireAuth } from "@/features/auth/auth";
import { insideFinishFormSchema } from "../inside-finish-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateInsideFinish(data: InsideFinishCreate & { id: number }): Promise<ActionResult<InsideFinish>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = insideFinishFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const insideFinish = await prisma.insideFinish.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.insideFinishes);
        return { data: insideFinish };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}