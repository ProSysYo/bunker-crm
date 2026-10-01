'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Hinge, HingeCreate } from "../hinge-types";
import { requireAuth } from "@/features/auth/auth";
import { hingeFormSchema } from "../hinge-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createHinge(data: HingeCreate): Promise<ActionResult<Hinge>> {
    await requireAuth();
    
    const result = hingeFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const hinge = await prisma.hinge.create({ data: { name: data.name } });
        revalidatePath(routes.hinges);
        return { data: hinge };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}