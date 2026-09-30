import { getBolt } from "@/features/bolts/actions/get-bolt";
import { BoltsEdit } from "@/features/bolts/pages/knobs-edit";
import { notFound } from "next/navigation";

export default async function BoltsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getBolt(Number(id));

    if (!item) {
        notFound();
    }

    return <BoltsEdit item={item} />;
}