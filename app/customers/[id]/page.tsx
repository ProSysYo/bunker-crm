import { getCustomer } from "@/features/customers/actions/get-customer";
import { CustomersEdit } from "@/features/customers/pages/customers-edit";
import { notFound } from "next/navigation";

export default async function CustomersEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getCustomer(Number(id));

    if (!item) {
        notFound();
    }

    return <CustomersEdit item={item} />;
}