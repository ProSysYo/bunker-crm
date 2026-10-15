"use server";

import prisma from "@/lib/prisma";
import { registerSchema, type RegisterFormValues } from "../model/schema";
import { saltAndHashPassword } from "@/shared/utils/password";

export async function registerUser(data: RegisterFormValues): Promise<{ success: boolean; error?: string }> {
    try {
        const validated = registerSchema.parse(data);

        // Проверяем, существует ли пользователь
        const existingUser = await prisma.user.findUnique({
            where: { email: validated.email },
        });

        if (existingUser) {
            return { success: false, error: "Пользователь с таким email уже существует" };
        }

        // Создаем пользователя (пароль хранится в открытом виде для тестирования)

        const hash = await saltAndHashPassword(validated.password);
        await prisma.user.create({
            data: {
                email: validated.email,
                password: hash,
            },
        });

        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Произошла ошибка при регистрации" };
    }
}
