"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { padFormSchema } from "../model/pad-schema";
import { requireAuth } from "@/features/auth/auth";
import { Pad, PadCreate } from "../types/Pad";
import { ActionResult } from "@/shared/utils/action-types";
import { handleServerError } from "@/shared/utils/server-error";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";

export async function updatePad(data: PadCreate & { id: number }): Promise<ActionResult<Pad>> {
    const { userId } = await requireAuth();
    if (!userId) {
        return { error: "Не авторизован" };
    }

    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = padFormSchema.safeParse({ name: data.name, type: data.type });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const pad = await prisma.pad.update({
            where: { id: data.id },
            data: { name: data.name, type: data.type },
        });

        revalidatePath("/pads");
        return { data: pad };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}
