import { getEar } from "@/features/ears/actions/get-ear";
import { EarsEdit } from "@/features/ears/pages/ears-edit";
import { notFound } from "next/navigation";

export default async function EarsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getEar(Number(id));

    if (!item) {
        notFound();
    }

    return <EarsEdit item={item} />;
}