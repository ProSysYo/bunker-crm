"use client";
import { useRouter } from "next/navigation";
import { ModelForm } from "../components/model-form";
import { Model } from "../model-types";

interface Props {
    item: Model;
}

export const ModelsEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать модель</h1>
                    <p className="text-sm text-muted-foreground">Измените данные модели</p>
                </div>
                <ModelForm
                    editId={item.id}
                    initialValues={{ code: item.code, name: item.name }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};