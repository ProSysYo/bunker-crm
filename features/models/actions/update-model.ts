'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Model, ModelCreate } from "../model-types";
import { requireAuth } from "@/features/auth/auth";
import { modelFormSchema } from "../model-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateModel(data: ModelCreate & { id: number }): Promise<ActionResult<Model>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = modelFormSchema.safeParse(data);
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const model = await prisma.model.update({
            where: { id: data.id },
            data: { 
                code: data.code,
                name: data.name 
            },
        });
        revalidatePath(routes.models);
        return { data: model };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}