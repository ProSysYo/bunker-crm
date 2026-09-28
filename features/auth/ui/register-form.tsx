"use client";

import Link from "next/link";

import { routes } from "@/config/navigation";
import { useRegisterStore } from "../store/use-register-store";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";
import { InputField } from "@/shared/ui/input-field";

export const RegisterForm = () => {
    const { values, errors, loading, serverError, setField, submit } = useRegisterStore();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void submit();
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
            {serverError && (
                <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                    {serverError}
                </div>
            )}

            <InputField
                id="email"
                label="Email"
                value={values.email}
                placeholder="Введите email"
                error={errors.email}
                onChange={(e) => setField("email", e.target.value)}
            />

            <InputField
                id="password"
                label="Пароль"
                value={values.password}
                placeholder="Введите пароль"
                error={errors.password}
                type="password"
                onChange={(e) => setField("password", e.target.value)}
            />

            <InputField
                id="confirmPassword"
                label="Подтвердите пароль"
                value={values.confirmPassword}
                placeholder="Введите пароль"
                error={errors.confirmPassword}
                type="password"
                onChange={(e) => setField("confirmPassword", e.target.value)}
            />

            <Button type="submit" variant="default">
                {loading ? "Отправка..." : "Зарегистрироваться"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{" "}
                <Link href={routes.login} className="text-primary hover:underline">
                    Войти
                </Link>
            </p>
        </form>
    );
};
