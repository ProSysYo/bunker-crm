"use client";

import { LockForm } from "@/features/locks/ui/lock-form";
import { useRouter } from "next/navigation";
import { TLock } from "@/features/locks/types/TLock";

interface Props {
    lock: TLock;
}

export const EditLockClient = ({ lock }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.push("/locks");
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать замок</h1>
                    <p className="text-sm text-muted-foreground">
                        Измените данные замка
                    </p>
                </div>
                <LockForm
                    editId={String(lock.id)}
                    initialValues={{ name: lock.name, type: lock.type }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};
