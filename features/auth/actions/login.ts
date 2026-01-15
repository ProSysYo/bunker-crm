"use server";

import prisma from "@/lib/prisma";
import { loginSchema, type LoginFormValues } from "../model/schema";
import { signIn, signOut } from "@/features/auth/auth";

export async function loginUser(data: LoginFormValues): Promise<{ success: boolean; error?: string }> {
    try {
        const validated = loginSchema.parse(data);

        const user = await prisma.user.findUnique({
            where: { email: validated.email },
        });

        if (!user) {
            return { success: false, error: "Неверный email или пароль" };
        }

        if (user.password !== validated.password) {
            return { success: false, error: "Неверный email или пароль" };
        }

        return { success: true };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Произошла ошибка при входе" };
    }
}

export async function signInWithCredentials(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    return;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
}

export async function signOutFunc() {
  try {
    const result = await signOut({ redirect: false, });

    return result;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    throw error;
  }
}