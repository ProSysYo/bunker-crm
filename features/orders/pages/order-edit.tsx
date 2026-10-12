"use client";

import { useRouter } from "next/navigation";

import { OrderForm } from "../components/order-form";
import type { OrderFormValues } from "../order-schema";
import type { OrderFormOptions } from "../oreder-types";

interface Props {
    options: OrderFormOptions;
    editId: number;
    initialValues: Partial<OrderFormValues>;
}

export default function OrderEdit({ options, editId, initialValues }: Props) {
    const router = useRouter();

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 pb-4">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Редактировать заказ</h1>
                <p className="text-sm text-muted-foreground">Измените параметры заказа</p>
            </header>

            <OrderForm
                options={options}
                editId={editId}
                initialValues={initialValues}
                onSuccess={() => router.back()}
            />
        </div>
    );
}
