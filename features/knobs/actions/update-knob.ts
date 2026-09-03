'use server'

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { knobFormSchema } from "@/features/knobs/model/knob-schema";

export async function updateKnob(prevState: unknown, formData: FormData) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    const id = Number(formData.get("id"));
    if (!id) {
        return { success: false, error: "Нет id" };
    }

    const name = formData.get("name") as string;

    const result = knobFormSchema.safeParse({ name });
    if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
            const path = issue.path[0] as string | undefined;
            if (path) {
                fieldErrors[path] = issue.message;
            }
        }
        return {
            success: false,
            error: fieldErrors.name || "Ошибка валидации",
            errors: fieldErrors,
        };
    }

    try {
        const knob = await prisma.knob.update({
            where: { id },
            data: { name },
        });

        revalidatePath("/knobs");
        return { success: true, data: knob };
    } catch (error) {
        console.error(error);
        return { success: false, error: "Ошибка обновления" };
    }
}
