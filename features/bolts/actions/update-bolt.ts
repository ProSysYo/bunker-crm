'use server'

import { ActionResult } from "@/shared/utils/action-types";
import { Bolt, BoltCreate } from "../types/Bolt";
import { requireAuth } from "@/features/auth/auth";
import { boltFormSchema } from "../model/bolt-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateBolt(data: BoltCreate & { id: number }): Promise<ActionResult<Bolt>> {
    await requireAuth();

    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = boltFormSchema.safeParse({ name: data.name });

    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);

        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }
    try {
        const bolt = await prisma.bolt.update({
            where: { id: data.id },
            data: { name: data.name },
        });

        revalidatePath(routes.bolts);

        return { data: bolt };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}
