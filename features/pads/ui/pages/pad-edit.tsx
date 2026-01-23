"use client";

import { routes } from "@/config/navigation";
import { TPadFull } from "@/features/pads/types/TPad";
import { PadForm } from "@/features/pads/ui/components/pad-form";
import { useRouter } from "next/navigation";

interface Props {
    item: TPadFull;
}

export const PadEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.push(routes.pads);
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать накладку</h1>
                    <p className="text-sm text-muted-foreground">Измените данные накладки</p>
                </div>
                <PadForm
                    editId={item.id}
                    initialValues={{ name: item.name, type: item.type }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};
