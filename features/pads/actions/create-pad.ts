"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { padFormSchema, PadFormValues } from "../model/pad-schema";
import { requireAuth } from "@/features/auth/auth";
import { ActionResult } from "@/shared/utils/action-types";
import { Pad } from "../types/Pad";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import { handleServerError } from "@/shared/utils/server-error";

export async function createPad(data: PadFormValues): Promise<ActionResult<Pad>> {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
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
        const pad = await prisma.pad.create({
            data: {
                name: data.name,
                type: data.type,
            },
        });
        revalidatePath("/pads");
        return { data: pad };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}
