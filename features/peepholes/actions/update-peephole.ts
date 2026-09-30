'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Peephole, PeepholeCreate } from "../peephole-types";
import { requireAuth } from "@/features/auth/auth";
import { peepholeFormSchema } from "../peephole-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updatePeephole(data: PeepholeCreate & { id: number }): Promise<ActionResult<Peephole>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = peepholeFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const peephole = await prisma.peephole.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.peepholes);
        return { data: peephole };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}