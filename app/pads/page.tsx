
import { lableLimits } from "@/config/table-limits";
import PadsClient from "./pads-client";
import { getPads } from "@/features/pads/actions";
import { TPadFull } from "@/features/pads/types/TPad";

export default async function LocksPage(props: {
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
        <PadsClient
            pads={pads as TPadFull[]}
            totalPages={pagination.totalPages}
        />
    );
}
