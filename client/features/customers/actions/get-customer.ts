import { Customer } from "../customer-types";
import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getCustomer(id: number): Promise<Customer | null> {
    const { userId } = await requireAuth();
    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    if (!id) {
        throw new Error("Нет id клиента");
    }

    const customer = await prisma.customer.findUnique({
        where: { id },
    });

    return customer;
}