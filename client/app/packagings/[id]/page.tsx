import { getPackaging } from "@/features/packagings/actions/get-packaging";
import { PackagingsEdit } from "@/features/packagings/pages/packagings-edit";
import { notFound } from "next/navigation";

export default async function PackagingsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPackaging(Number(id));

    if (!item) {
        notFound();
    }

    return <PackagingsEdit item={item} />;
}