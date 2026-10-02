'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Foil, FoilCreate } from "../foil-types";
import { requireAuth } from "@/features/auth/auth";
import { foilFormSchema } from "../foil-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createFoil(data: FoilCreate): Promise<ActionResult<Foil>> {
    await requireAuth();
    
    const result = foilFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const foil = await prisma.foil.create({ data: { name: data.name } });
        revalidatePath(routes.foils);
        return { data: foil };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}