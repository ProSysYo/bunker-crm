'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { JambHole, JambHoleCreate } from "../jamb-hole-types";
import { requireAuth } from "@/features/auth/auth";
import { jambHoleFormSchema } from "../jamb-hole-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateJambHole(data: JambHoleCreate & { id: number }): Promise<ActionResult<JambHole>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = jambHoleFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const jambHole = await prisma.jambHole.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.jambHoles);
        return { data: jambHole };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}