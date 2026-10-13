'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { InsideFinish, InsideFinishCreate } from "../inside-finish-types";
import { requireAuth } from "@/features/auth/auth";
import { insideFinishFormSchema } from "../inside-finish-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createInsideFinish(data: InsideFinishCreate): Promise<ActionResult<InsideFinish>> {
    await requireAuth();
    
    const result = insideFinishFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const insideFinish = await prisma.insideFinish.create({ data: { name: data.name } });
        revalidatePath(routes.insideFinishes);
        return { data: insideFinish };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}