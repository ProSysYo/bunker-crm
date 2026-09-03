"use client";

import Link from "next/link";
import { Button, Input } from "@heroui/react";

import { routes } from "@/config/navigation";
import { useRegisterStore } from "../store/use-register-store";

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

            <div className="flex flex-col gap-1">
                <Input
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="password"
                    placeholder="Пароль"
                    value={values.password}
                    onChange={(e) => setField("password", e.target.value)}
                    aria-invalid={Boolean(errors.password)}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <Input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={values.confirmPassword}
                    onChange={(e) => setField("confirmPassword", e.target.value)}
                    aria-invalid={Boolean(errors.confirmPassword)}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" variant="tertiary" isPending={loading} isDisabled={loading}>
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
