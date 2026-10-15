"use client";
import { useRouter } from "next/navigation";
import { CustomerForm } from "../components/customer-form";
import { Customer } from "../customer-types";

interface Props {
    item: Customer;
}

export const CustomersEdit = ({ item }: Props) => {
    const router = useRouter();
    const handleSuccess = () => {
        router.back();
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6 rounded-xl border bg-card p-8 shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Редактировать клиента</h1>
                    <p className="text-sm text-muted-foreground">Измените данные клиента</p>
                </div>
                <CustomerForm
                    editId={item.id}
                    initialValues={{ code: item.code, name: item.name }}
                    onSuccess={handleSuccess}
                />
            </div>
        </div>
    );
};