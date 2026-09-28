"use server";

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { knobFormSchema } from "@/features/knobs/model/knob-schema";
import { handleServerError } from "@/shared/utils/server-error";
import { ActionResult } from "@/shared/utils/action-types";
import { TKnobCreate, TKnob } from "@/features/knobs/types/TKnob";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";

export async function updateKnob(data: TKnobCreate & { id: number }): Promise<ActionResult<TKnob>> {
    const { userId } = await requireAuth();
    if (!userId) {
        return { error: "Не авторизован" };
    }

    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = knobFormSchema.safeParse({ name: data.name });
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const knob = await prisma.knob.update({
            where: { id: data.id },
            data: { name: result.data.name },
        });

        revalidatePath("/knobs");
        return { data: knob };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}
