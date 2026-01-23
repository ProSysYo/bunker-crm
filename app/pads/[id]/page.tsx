import { notFound } from "next/navigation";
import { PadEdit } from "../../../features/pads/ui/pages/pad-edit";
import { getPad } from "@/features/pads/actions/get-pad";

export default async function PadEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPad(Number(id));

    if (!item) {
        notFound();
    }

    return <PadEdit item={item} />;
}
