import { tableLimits } from "@/config/table-limits";
import { getHinges } from "@/features/hinges/actions/get-hinges";
import HingesList from "@/features/hinges/pages/hinges-list";

export default async function HingesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { hinges, pagination } = await getHinges({
        search: query,
        page: currentPage,
        limit: tableLimits.hinges,
    });

    return (
        <HingesList
            items={hinges}
            totalPages={pagination.totalPages}
        />
    );
}