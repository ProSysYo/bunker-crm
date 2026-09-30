'use server'

import { ActionResult } from "@/shared/utils/action-types";
import { Bolt, BoltCreate } from "../types/Bolt";
import { requireAuth } from "@/features/auth/auth";
import { boltFormSchema } from "../model/bolt-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createBolt(data: BoltCreate): Promise<ActionResult<Bolt>> {
    await requireAuth();

    const result = boltFormSchema.safeParse({ name: data.name });

    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        //проверить на уникальность, что засов с таким именем уже существует
        const bolt = await prisma.bolt.create({ data: { name: data.name } });
        revalidatePath(routes.bolts);
        return { data: bolt };
    } catch (error) {
        console.error(error);

        return { error: handleServerError(error) };
    }
}
