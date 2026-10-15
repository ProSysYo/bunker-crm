'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Packaging, PackagingCreate } from "../packaging-types";
import { requireAuth } from "@/features/auth/auth";
import { packagingFormSchema } from "../packaging-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createPackaging(data: PackagingCreate): Promise<ActionResult<Packaging>> {
    await requireAuth();
    
    const result = packagingFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const packaging = await prisma.packaging.create({ data: { name: data.name } });
        revalidatePath(routes.packagings);
        return { data: packaging };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}