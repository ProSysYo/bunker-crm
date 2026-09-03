import { tableLimits } from "@/config/table-limits";
import { getKnobs } from "@/features/knobs/actions/get-knobs";
import KnobsList from "@/features/knobs/ui/pages/knobs-list";

export default async function KnobsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { knobs, pagination } = await getKnobs({
        search: query,
        page: currentPage,
        limit: tableLimits.knobs,
    });

    return (
        <KnobsList
            knobs={knobs}
            totalPages={pagination.totalPages}
        />
    );
}
