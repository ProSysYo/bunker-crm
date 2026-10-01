"use client";
import { useRouter } from "next/navigation";
import { PackagingForm } from "../components/packaging-form";
import { Packaging } from "../packaging-types";

interface Props {
    item: Packaging;
}

export const PackagingsEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать упаковку</h1>
                    <p className="text-sm text-muted-foreground">Измените данные упаковки</p>
                </div>
                <PackagingForm
                    editId={item.id}
                    initialValues={{ name: item.name }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};