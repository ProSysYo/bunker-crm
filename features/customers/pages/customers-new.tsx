"use client";
import { useRouter } from "next/navigation";
import { CustomerForm } from "../components/customer-form";

export const CustomersNew = () => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Добавить клиента</h1>
                    <p className="text-sm text-muted-foreground">
                        Заполните данные для создания нового клиента
                    </p>
                </div>
                <CustomerForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
};