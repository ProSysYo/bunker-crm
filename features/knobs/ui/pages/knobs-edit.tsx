"use client";

import { routes } from "@/config/navigation";
import { TKnob } from "@/features/knobs/types/TKnob";
import { useRouter } from "next/navigation";
import { KnobForm } from "../components/knob-form";

interface Props {
    item: TKnob;
}

export const KnobsEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать ручку</h1>
                    <p className="text-sm text-muted-foreground">Измените данные ручки</p>
                </div>
                <KnobForm
                    editId={item.id}
                    initialValues={{ name: item.name }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};
