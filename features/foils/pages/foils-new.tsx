"use client";
import { useRouter } from "next/navigation";
import { FoilForm } from "../components/foil-form";

export const FoilsNew = () => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Добавить пленку</h1>
                    <p className="text-sm text-muted-foreground">
                        Заполните данные для создания новой пленки
                    </p>
                </div>
                <FoilForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
};