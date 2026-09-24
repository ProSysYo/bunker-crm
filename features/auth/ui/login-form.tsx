"use client";

import Link from "next/link";
import { useLoginStore } from "../store/use-login-store";
import { routes } from "@/config/navigation";
import { Field, FieldDescription, FieldLabel } from "@/shared/ui/shadcn/field";
import { Input } from "@/shared/ui/shadcn/input";
import { Button } from "@/shared/ui/shadcn/button";

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

            <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="name">Email</FieldLabel>
                <Input
                    id="name"
                    type="email"
                    required
                    placeholder="Введите email"
                    value={values.email}
                    aria-invalid={!!errors.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("email", e.target.value)}
                />

                {errors.email && <FieldDescription>{errors.email}</FieldDescription>}
            </Field>

            <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Пароль</FieldLabel>
                <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Введите пароль"
                    value={values.password}
                    aria-invalid={!!errors.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setField("password", e.target.value)}
                />

                {errors.password && <FieldDescription>{errors.password}</FieldDescription>}
            </Field>

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
