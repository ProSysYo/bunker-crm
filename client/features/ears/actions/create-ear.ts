'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Ear, EarCreate } from "../ear-types";
import { requireAuth } from "@/features/auth/auth";
import { earFormSchema } from "../ear-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createEar(data: EarCreate): Promise<ActionResult<Ear>> {
    await requireAuth();
    
    const result = earFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const ear = await prisma.ear.create({ data: { name: data.name } });
        revalidatePath(routes.ears);
        return { data: ear };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}