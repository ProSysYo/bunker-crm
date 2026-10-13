'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Paint, PaintCreate } from "../paint-types";
import { requireAuth } from "@/features/auth/auth";
import { paintFormSchema } from "../paint-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createPaint(data: PaintCreate): Promise<ActionResult<Paint>> {
    await requireAuth();
    
    const result = paintFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const paint = await prisma.paint.create({ data: { name: data.name } });
        revalidatePath(routes.paints);
        return { data: paint };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}