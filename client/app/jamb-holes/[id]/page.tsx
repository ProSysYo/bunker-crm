import { getJambHole } from "@/features/jamb-holes/actions/get-jamb-hole";
import { JambHolesEdit } from "@/features/jamb-holes/pages/jamb-holes-edit";
import { notFound } from "next/navigation";

export default async function JambHolesEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getJambHole(Number(id));

    if (!item) {
        notFound();
    }

    return <JambHolesEdit item={item} />;
}