
import { tableLimits } from "@/config/table-limits";
import Pads from "../../features/pads/pages/pads";
import { Pad } from "@/features/pads/types/Pad";
import { getPads } from "@/features/pads/actions/get-pads";

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
        limit: tableLimits.pads,
    });

    return (
        <Pads
            pads={pads as Pad[]}
            totalPages={pagination.totalPages}
        />
    );
}
