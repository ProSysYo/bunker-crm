import { requireAuth } from "@/features/auth/auth";
import prisma from "@/lib/prisma";

export async function getBolts(params?: { search?: string; page?: number; limit?: number }) {
    const { userId } = await requireAuth();

    if (!userId) {
        throw new Error("Нет id пользователя");
    }

    const { search = "", page = 1, limit = 10 } = params || {};

    const skip = (page - 1) * limit;

    const where = search
        ? {
              OR: [{ name: { contains: search, mode: "insensitive" as const } }],
          }
        : {};

    const [bolts, total] = await Promise.all([
        prisma.bolt.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),
        prisma.bolt.count({ where }),
    ]);

    return {
        bolts,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
}
