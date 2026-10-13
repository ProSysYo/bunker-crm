'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Packaging, PackagingCreate } from "../packaging-types";
import { requireAuth } from "@/features/auth/auth";
import { packagingFormSchema } from "../packaging-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updatePackaging(data: PackagingCreate & { id: number }): Promise<ActionResult<Packaging>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = packagingFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const packaging = await prisma.packaging.update({
            where: { id: data.id },
            data: { name: data.name },
        });
        revalidatePath(routes.packagings);
        return { data: packaging };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}