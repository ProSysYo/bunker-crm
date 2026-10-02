'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { OutsideFinish, OutsideFinishCreate } from "../outside-finish-types";
import { requireAuth } from "@/features/auth/auth";
import { outsideFinishFormSchema } from "../outside-finish-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateOutsideFinish(data: OutsideFinishCreate & { id: number }): Promise<ActionResult<OutsideFinish>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = outsideFinishFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const outsideFinish = await prisma.outsideFinish.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.outsideFinishes);
        return { data: outsideFinish };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}