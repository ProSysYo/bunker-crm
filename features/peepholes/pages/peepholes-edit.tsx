"use client";
import { useRouter } from "next/navigation";
import { PeepholeForm } from "../components/peephole-form";
import { Peephole } from "../peephole-types";

interface Props {
    item: Peephole;
}

export const PeepholesEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать глазок</h1>
                    <p className="text-sm text-muted-foreground">Измените данные глазка</p>
                </div>
                <PeepholeForm
                    editId={item.id}
                    initialValues={{ name: item.name }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};