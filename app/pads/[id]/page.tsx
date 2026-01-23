import { notFound } from "next/navigation";
import { getPad } from "@/features/pads/actions";
import { PadEdit } from "../../../features/pads/ui/pages/pad-edit";

export default async function EditPadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPad(Number(id));

    if (!item) {
        notFound();
    }

    return <PadEdit item={item} />;
}
