'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Peephole, PeepholeCreate } from "../peephole-types";
import { requireAuth } from "@/features/auth/auth";
import { peepholeFormSchema } from "../peephole-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createPeephole(data: PeepholeCreate): Promise<ActionResult<Peephole>> {
    await requireAuth();
    
    const result = peepholeFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const peephole = await prisma.peephole.create({ data: { name: data.name } });
        revalidatePath(routes.peepholes);
        return { data: peephole };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}