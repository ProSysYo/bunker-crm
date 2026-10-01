import { tableLimits } from "@/config/table-limits";
import { getJambHoles } from "@/features/jamb-holes/actions/get-jamb-holes";
import JambHolesList from "@/features/jamb-holes/pages/jamb-holes-list";

export default async function JambHolesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { jambHoles, pagination } = await getJambHoles({
        search: query,
        page: currentPage,
        limit: tableLimits.jambHoles,
    });

    return (
        <JambHolesList
            items={jambHoles}
            totalPages={pagination.totalPages}
        />
    );
}