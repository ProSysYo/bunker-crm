"use server";

import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getPads(params?: { search?: string; page?: number; limit?: number }) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id");
    }

    const { search = "", page = 1, limit = 10 } = params || {};
    const skip = (page - 1) * limit;

    const where = search
        ? {
              OR: [{ name: { contains: search, mode: "insensitive" as const } }],
          }
        : {};

    const [pads, total] = await Promise.all([
        prisma.pad.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.pad.count({ where }),
    ]);

    return {
        pads,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
