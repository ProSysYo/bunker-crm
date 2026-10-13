import { getPeephole } from "@/features/peepholes/actions/get-peephole";
import { PeepholesEdit } from "@/features/peepholes/pages/peepholes-edit";
import { notFound } from "next/navigation";

export default async function PeepholesEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPeephole(Number(id));

    if (!item) {
        notFound();
    }

    return <PeepholesEdit item={item} />;
}