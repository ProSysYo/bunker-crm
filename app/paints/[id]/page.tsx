import { getPaint } from "@/features/paints/actions/get-paint";
import { PaintsEdit } from "@/features/paints/pages/paints-edit";
import { notFound } from "next/navigation";

export default async function PaintsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPaint(Number(id));

    if (!item) {
        notFound();
    }

    return <PaintsEdit item={item} />;
}