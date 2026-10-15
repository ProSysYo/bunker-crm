'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Customer, CustomerCreate } from "../customer-types";
import { requireAuth } from "@/features/auth/auth";
import { customerFormSchema } from "../customer-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { handleServerError } from "@/shared/utils/server-error";
import { revalidatePath } from "next/cache";
import { routes } from "@/config/navigation";

export async function updateCustomer(data: CustomerCreate & { id: number }): Promise<ActionResult<Customer>> {
    await requireAuth();
    
    if (!data.id) {
        return { error: "Не указан id записи" };
    }

    const result = customerFormSchema.safeParse(data);
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return {
            error: getFirstZodError(result.error),
            errors: fieldErrors,
        };
    }

    try {
        const customer = await prisma.customer.update({
            where: { id: data.id },
            data: { 
                code: data.code,
                name: data.name 
            },
        });
        revalidatePath(routes.customers);
        return { data: customer };
    } catch (error) {
        return { error: handleServerError(error) };
    }
}