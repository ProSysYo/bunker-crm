import { notFound } from "next/navigation";
import { getKnob } from "@/features/knobs/actions/get-knob";
import { KnobsEdit } from "@/features/knobs/ui/pages/knobs-edit";

export default async function KnobsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getKnob(Number(id));

    if (!item) {
        notFound();
    }

    return <KnobsEdit item={item} />;
}
