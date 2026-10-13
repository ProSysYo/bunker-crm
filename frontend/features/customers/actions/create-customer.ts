'use server'
import { ActionResult } from "@/shared/utils/action-types";
import { Customer, CustomerCreate } from "../customer-types";
import { requireAuth } from "@/features/auth/auth";
import { customerFormSchema } from "../customer-schema";
import { getFirstZodError, parseZodErrors } from "@/shared/utils/zod-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { handleServerError } from "@/shared/utils/server-error";
import { routes } from "@/config/navigation";

export async function createCustomer(data: CustomerCreate): Promise<ActionResult<Customer>> {
    await requireAuth();
    
    const result = customerFormSchema.safeParse(data);
    if (!result.success) {
        const fieldErrors = parseZodErrors(result.error);
        return { error: getFirstZodError(result.error), errors: fieldErrors };
    }

    try {
        const customer = await prisma.customer.create({ 
            data: { 
                code: data.code,
                name: data.name 
            } 
        });
        revalidatePath(routes.customers);
        return { data: customer };
    } catch (error) {
        console.error(error);
        return { error: handleServerError(error) };
    }
}