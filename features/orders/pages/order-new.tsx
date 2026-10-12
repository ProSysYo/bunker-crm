"use client";

import { useRouter } from "next/navigation";

import { OrderForm } from "../components/order-form";
import type { OrderFormOptions } from "../oreder-types";

interface Props {
    options: OrderFormOptions;
}

export default function OrderNew({ options }: Props) {
    const router = useRouter();

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6 pb-4">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Новый заказ</h1>
                <p className="text-sm text-muted-foreground">Выбор конфигурации двери</p>
            </header>

            <OrderForm options={options} onSuccess={() => router.push("/orders")} />
        </div>
    );
}
