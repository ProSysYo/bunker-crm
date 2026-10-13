'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Model, ModelCreate } from "../model-types";
import { requireAuth } from "@/features/auth/auth";
import { modelFormSchema } from "../model-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createModel(data: ModelCreate): Promise<ActionResult<Model>> {
    await requireAuth();
    
    const result = modelFormSchema.safeParse(data);
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const model = await prisma.model.create({ 
            data: { 
                code: data.code,
                name: data.name 
            } 
        });
        revalidatePath(routes.models);
        return { data: model };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}