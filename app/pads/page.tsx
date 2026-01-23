
import { lableLimits } from "@/config/table-limits";
import Pads from "../../features/pads/ui/pages/pads";
import { getPads } from "@/features/pads/actions";
import { TPadFull } from "@/features/pads/types/TPad";

export default async function PadsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { pads, pagination } = await getPads({
        search: query,
        page: currentPage,
        limit: lableLimits.pads,
    });

    return (
        <Pads
            pads={pads as TPadFull[]}
            totalPages={pagination.totalPages}
        />
    );
}
