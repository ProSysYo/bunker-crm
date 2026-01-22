import { notFound } from "next/navigation";
import { getPad } from "@/features/pads/actions";
import { EditPadClient } from "./edit-pad-client";

export default async function EditPadPageRoute({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getPad(Number(id));

    if (!item) {
        notFound();
    }

    return <EditPadClient item={item} />;
}
