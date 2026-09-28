"use server";

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { knobFormSchema, KnobFormValues } from "../model/knob-schema";
import { handleServerError } from "@/shared/utils/server-error";
import { ActionResult } from "@/shared/utils/action-types";
import { TKnob } from "../types/TKnob";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";

export async function createKnob(data: KnobFormValues): Promise<ActionResult<TKnob>> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
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
        const knob = await prisma.knob.create({
            data: {
                name: data.name,
            },
        });
        revalidatePath("/knobs");
        return { data: knob };
    } catch (error) {
        console.error(error);

        return { error: handleServerError(error) };
    }
}
