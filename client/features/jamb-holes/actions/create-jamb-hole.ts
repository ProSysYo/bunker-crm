'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { JambHole, JambHoleCreate } from "../jamb-hole-types";
import { requireAuth } from "@/features/auth/auth";
import { jambHoleFormSchema } from "../jamb-hole-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createJambHole(data: JambHoleCreate): Promise<ActionResult<JambHole>> {
    await requireAuth();
    
    const result = jambHoleFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const jambHole = await prisma.jambHole.create({ data: { name: data.name } });
        revalidatePath(routes.jambHoles);
        return { data: jambHole };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}