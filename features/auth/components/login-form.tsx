"use client";

import Link from "next/link";
import { useLoginStore } from "../store/use-login-store";
import { routes } from "@/config/navigation";
import { Button } from "@/shared/components/shadcn/button";
import { InputField } from "@/shared/components/input-field";

export const LoginForm = () => {
    const { values, errors, loading, serverError, setField, submit } = useLoginStore();

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
                label="Password"
                value={values.password}
                placeholder="Введите пароль"
                error={errors.password}
                type="password"
                onChange={(e) => setField("password", e.target.value)}
            />

            <Button type="submit" variant="default">
                {loading ? "Отправка..." : "Войти"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link href={routes.register} className="text-primary hover:underline">
                    Зарегистрироваться
                </Link>
            </p>
        </form>
    );
};
