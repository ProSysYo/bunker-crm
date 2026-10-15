'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Foil, FoilCreate } from "../foil-types";
import { requireAuth } from "@/features/auth/auth";
import { foilFormSchema } from "../foil-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateFoil(data: FoilCreate & { id: number }): Promise<ActionResult<Foil>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = foilFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const foil = await prisma.foil.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.foils);
        return { data: foil };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}